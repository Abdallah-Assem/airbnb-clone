import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface BookingVM {
  Id: number;
  ListingId: number;
  ListingTitle?: string;
  GuestId?: string;
  CheckInDate: string;
  CheckOutDate: string;
  TotalPrice: number;
  PaymentStatus: string;
  BookingStatus: string;
  CreatedAt?: string;
  ClientSecret?: string;
  PaymentIntentId?: string;
}

// Alias for backward compatibility
export type BookingResponse = BookingVM;

interface ApiResponse<T> {
  success: boolean;
  result: T;
  errorMessage?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/booking`;

  getMyBookings(): Observable<BookingVM[]> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/me`).pipe(
      map(response => {
        console.log('Raw booking API response:', response);
        const bookings = (response.result || []).map(b => ({
          Id: b.id,
          ListingId: b.listingId,
          ListingTitle: b.listingTitle,
          GuestId: b.guestId,
          CheckInDate: b.checkInDate,
          CheckOutDate: b.checkOutDate,
          TotalPrice: b.totalPrice,
          PaymentStatus: b.paymentStatus,
          BookingStatus: b.bookingStatus,
          CreatedAt: b.createdAt,
          ClientSecret: b.clientSecret,
          PaymentIntentId: b.paymentIntentId
        }));
        console.log('Mapped bookings:', bookings);
        return bookings;
      })
    );
  }

  getBookingById(id: number): Observable<BookingVM> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/${id}`).pipe(
      map(response => {
        const b = response.result;
        return {
          Id: b.id,
          ListingId: b.listingId,
          ListingTitle: b.listingTitle,
          GuestId: b.guestId,
          CheckInDate: b.checkInDate,
          CheckOutDate: b.checkOutDate,
          TotalPrice: b.totalPrice,
          PaymentStatus: b.paymentStatus,
          BookingStatus: b.bookingStatus,
          CreatedAt: b.createdAt,
          ClientSecret: b.clientSecret,
          PaymentIntentId: b.paymentIntentId
        };
      })
    );
  }
}
