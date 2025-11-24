import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  password = '';
  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        // redirect to home if not admin (AuthService will go to admin if admin)
        if (!this.auth.isAdmin()) this.router.navigate(['/']);
      },
      error: err => console.error('Login failed', err)
    });
  }
}
