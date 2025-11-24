import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly cookieName = 'airbnb_token';
  private readonly apiBase = 'http://localhost:5235/api/auth';
  private authSubject = new BehaviorSubject<boolean>(!!this.getToken());
  public isAuthenticated$ = this.authSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // store token in cookie for given number of days (default 1)
  setToken(token: string, days = 1) {
    if (typeof document === 'undefined') {
      this.authSubject.next(true);
      return;
    }

    // ensure any existing cookie is cleared first (avoid leftover attributes)
    document.cookie = `${this.cookieName}=;Max-Age=0;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;

    const maxAge = days * 24 * 60 * 60; // seconds
    const expires = new Date(Date.now() + maxAge * 1000).toUTCString();
    // build cookie attributes: SameSite for modern browsers, Secure on https
    const sameSite = 'SameSite=Lax';
    const secure = (typeof location !== 'undefined' && location.protocol === 'https:') ? ';Secure' : '';
    document.cookie = `${this.cookieName}=${encodeURIComponent(token)};Max-Age=${maxAge};expires=${expires};path=/;${sameSite}${secure}`;
    // notify subscribers
    this.authSubject.next(true);
  }

  getToken(): string | null {
    if (typeof document === 'undefined') return null;
    const nameEQ = this.cookieName + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
  }

  removeToken() {
    if (typeof document !== 'undefined') {
      // clear cookie using both Max-Age and expires to maximize compatibility
      document.cookie = `${this.cookieName}=;Max-Age=0;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
    this.authSubject.next(false);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // simple JWT payload decoder (no validation) to access claims
  getPayload(): any | null {
    const token = this.getToken();
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length < 2) return null;
    try {
      const payload = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decodeURIComponent(escape(payload)));
    } catch {
      return null;
    }
  }

  isAdmin(): boolean {
    const p = this.getPayload();
    if (!p) return false;
    const role = p['role'] || p['roles'] || p['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    if (!role) return false;
    if (Array.isArray(role)) return role.includes('Admin');
    return role === 'Admin';
  }

  // Login endpoint call: expects backend returns token (adjust if backend returns different shape)
  login(model: { email: string; password: string }): Observable<any> {
    console.log('AuthService: login called with', model);
    return this.http.post<any>(`${this.apiBase}/login`, model).pipe(
      tap(res => {
        // backend returns { result: '<token>', ... }
        const token = res?.result || res?.token;
        if (token) {
          // remove any existing token first (handle multi-login in same client)
          this.removeToken();
          this.setToken(token);
          // if admin, navigate to admin dashboard
          if (this.isAdmin()) this.router.navigate(['/admin']);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post<any>(`${this.apiBase}/register`, model).pipe(
      tap(res => {
        const token = res?.result || res?.token;
        if (token) {
          // remove any existing token first
          this.removeToken();
          this.setToken(token);
        }
      })
    );
  }

  logout() {
    // clear token and notify
    this.removeToken();
    // navigate to login page
    this.router.navigate(['/auth/login']);
  }
}
