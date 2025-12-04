import { ChangeDetectorRef, Component, EventEmitter, inject, Input, NgZone, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../../core/services/Booking/booking-service';
import { ListingService } from '../../../core/services/listings/listing.service';
import { CreateBookingVM } from '../../../core/models/booking';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingStoreService } from '../../../core/services/Booking/booking-store-service';

@Component({
  selector: 'app-create-booking',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-booking.html',
  styleUrl: './create-booking.css',
})
export class CreateBooking implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookingService = inject(BookingService);
  private listingService = inject(ListingService);
  private bookingStore = inject(BookingStoreService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);


  bookingForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  today!: string;

  @Input() listingId!: number;
  @Input() listingPrice: number = 100;
  @Input() listingMaxGuests?: number;
  @Output() bookingCreated = new EventEmitter<any>();
  @Output() bookingCancelled = new EventEmitter<void>();
  ngOnInit(): void {
    this.initForm();

    if (!this.listingId) {
      this.listingId = Number(this.route.snapshot.paramMap.get('id'));
    }
    this.today = new Date().toISOString().split('T')[0];

    if (!this.listingPrice || !this.listingMaxGuests) {
      if (this.listingId) {
        this.listingService.getById(this.listingId).subscribe({
          next: (res) => {
            if (!res.isError && res.data) {
              this.listingPrice = res.data.pricePerNight ?? this.listingPrice;
              this.listingMaxGuests = res.data.maxGuests ?? this.listingMaxGuests;

              // Update validators after loading listing data
              this.bookingForm.get('guests')?.setValidators([
                Validators.required,
                Validators.min(1),
                Validators.max(this.listingMaxGuests ?? 10)
              ]);
              this.bookingForm.get('guests')?.updateValueAndValidity();

              // ✅ Trigger change detection manually
              this.cdr.detectChanges();
            }
          },
          error: (err) => {
            console.warn('Failed to load listing details for booking', err);
          }
        });
      }
    }
  }
  private initForm(): void {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    this.bookingForm = this.fb.group({
      checkInDate: [today, [Validators.required]],
      checkOutDate: [tomorrow, [Validators.required]],
      guests: [1, [Validators.required, Validators.min(1), Validators.max(this.listingMaxGuests ?? 10)]],
      paymentMethod: ['stripe', [Validators.required]]
    });

    // cross-field validation: checkOut must be after checkIn
    this.bookingForm.setValidators(() => {
      const checkIn = new Date(this.bookingForm.get('checkInDate')?.value);
      const checkOut = new Date(this.bookingForm.get('checkOutDate')?.value);
      if (checkOut <= checkIn) return { invalidDates: true };
      return null;
    });
  }
  calculateTotalPrice(): number {
    const checkIn = new Date(this.bookingForm.get('checkInDate')?.value);
    const checkOut = new Date(this.bookingForm.get('checkOutDate')?.value);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    return nights * (this.listingPrice || 0);
  }

onSubmit(): void {
  if (!this.bookingForm.valid) {
    this.errorMessage = 'Please fill in all required fields correctly.';
    return;
  }

  this.isLoading = true;
  this.errorMessage = '';

  const bookingData: CreateBookingVM = {
    listingId: this.listingId,
    checkInDate: this.bookingForm.get('checkInDate')?.value,
    checkOutDate: this.bookingForm.get('checkOutDate')?.value,
    guests: this.bookingForm.get('guests')?.value,
    paymentMethod: this.bookingForm.get('paymentMethod')?.value || 'stripe'
  };

  console.log('📤 Submitting booking:', bookingData);

  this.bookingService.createBooking(bookingData).subscribe({
    next: (res) => {
      console.log('✅ Booking response:', res);

      this.isLoading = false;

      if (!res || !res.success || !res.result) {
        this.errorMessage = res?.errorMessage || 'Failed to create booking';
        this.cdr.detectChanges();
        return;
      }

      const booking = res.result;
      console.log('✅ Booking created:', booking);

      // Store booking in state
      this.bookingStore.setCurrentBooking(booking);
      this.bookingCreated.emit(booking);

      // Store PaymentIntent if present
      if (booking.clientSecret && booking.paymentIntentId) {
        console.log('💳 Storing payment intent:', booking.paymentIntentId);
        this.bookingStore.setPaymentIntent(
          booking.clientSecret,
          booking.paymentIntentId
        );
      }

      // ✅ Navigate using NgZone to ensure it happens within Angular context
      this.ngZone.run(() => {
        console.log('🔀 Navigating to payment for booking:', booking.id);
        this.router.navigate(['/booking/payment', booking.id]).then(
          (success) => {
            if (success) {
              console.log('✅ Navigation successful');
            } else {
              console.error('❌ Navigation returned false');
              this.errorMessage = 'Navigation failed. Please check your bookings.';
              this.cdr.detectChanges();
            }
          },
          (err) => {
            console.error('❌ Navigation failed:', err);
            this.errorMessage = 'Navigation failed. Please check your bookings.';
            this.cdr.detectChanges();
          }
        );
      });
    },
    error: (err) => {
      console.error('❌ Booking creation error:', err);
      this.isLoading = false;

      this.errorMessage = err?.errorMessage || 
                          err?.error?.errorMessage || 
                          err?.message || 
                          'An unexpected error occurred';
      
      this.cdr.detectChanges();
    }
  });
}
  onCancel(): void {
    this.bookingCancelled.emit();
  }
  getNumberOfNights(): number {
    const checkIn = new Date(this.bookingForm.get('checkInDate')?.value);
    const checkOut = new Date(this.bookingForm.get('checkOutDate')?.value);
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  }
  get minCheckOutDate(): string {
    const checkInDate = this.bookingForm.get('checkInDate')?.value;
    if (checkInDate) {
      const nextDay = new Date(checkInDate);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay.toISOString().split('T')[0];
    }
    return '';
  }
}