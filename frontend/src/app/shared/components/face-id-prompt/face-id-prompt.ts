import { Component, OnInit, OnDestroy, inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { FaceCaptureComponent } from '../../../features/auth/face-capture/face-capture.component';

@Component({
  selector: 'app-face-id-prompt',
  standalone: true,
  imports: [CommonModule, TranslateModule, FaceCaptureComponent],
  templateUrl: './face-id-prompt.html',
  styleUrls: ['./face-id-prompt.css']
})
export class FaceIdPromptComponent implements OnInit, OnDestroy {
  @ViewChild('faceCapture') faceCapture!: FaceCaptureComponent;

  showPrompt = false;
  isDismissed = false;
  isLoading = false;

  private auth = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  private sub = new Subscription();

  ngOnInit() {
    console.log('FaceIdPromptComponent initialized');

    // Check if user is authenticated and doesn't have face ID
    this.sub.add(
      this.auth.isAuthenticated$.subscribe(isAuth => {
        console.log('FaceIdPrompt: isAuthenticated changed to:', isAuth);
        if (isAuth) {
          this.checkFaceIdStatus();
        } else {
          this.showPrompt = false;
        }
      })
    );
  }

  private checkFaceIdStatus() {
    // Check localStorage flag
    const hasFaceId = localStorage.getItem('hasFaceId');
    const dismissed = localStorage.getItem('faceIdPromptDismissed');

    console.log('FaceIdPrompt: Checking status - hasFaceId:', hasFaceId, 'dismissed:', dismissed);

    // If user doesn't have face ID and hasn't dismissed the prompt
    if (hasFaceId === 'false' && dismissed !== 'true') {
      console.log('FaceIdPrompt: Will show prompt in 2 seconds');
      // Show prompt after a short delay for better UX
      setTimeout(() => {
        this.showPrompt = true;
        this.cdr.detectChanges();
        console.log('FaceIdPrompt: Prompt should now be visible');
      }, 2000);
    } else {
      console.log('FaceIdPrompt: Not showing prompt. Conditions not met.');
    }
  }

  setupFaceId() {
    this.faceCapture.open();
  }

  dismissPrompt() {
    this.showPrompt = false;
    this.isDismissed = true;
    // Remember dismissal for this session
    localStorage.setItem('faceIdPromptDismissed', 'true');
  }

  onFaceCaptured(file: File) {
    this.isLoading = true;
    const userId = this.auth.getPayload()?.sub || this.auth.getPayload()?.nameid;

    if (!userId) {
      this.isLoading = false;
      return;
    }

    // Convert the captured face image to base64 for thumbnail storage
    const reader = new FileReader();
    reader.onload = (e: any) => {
      localStorage.setItem('userThumbnail', e.target.result);
    };
    reader.readAsDataURL(file);

    this.auth.registerFace(userId, file).subscribe({
      next: () => {
        console.log('Face registration successful');
        this.isLoading = false;

        // Update hasFaceId flag
        localStorage.setItem('hasFaceId', 'true');

        // Close the face capture modal
        this.faceCapture.closeModal();

        // Hide the prompt
        this.showPrompt = false;
      },
      error: (err) => {
        console.error('Face registration failed:', err);
        this.isLoading = false;

        // Close the face capture modal on error
        this.faceCapture.closeModal();
      }
    });
  }

  onFaceCaptureCancelled() {
    // Don't dismiss permanently, just hide for now
    this.showPrompt = false;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
