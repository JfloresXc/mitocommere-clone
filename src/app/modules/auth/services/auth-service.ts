import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { environment } from '@envs/environment.development';
import { catchError, tap } from 'rxjs';
import { LoginResponseDTO } from '../models/LoginResponseDTO';
import { UserAuth } from './user-auth';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

const ACCESS_TOKEN = 'access_token';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(HttpClient);
  currentUser = signal<UserAuth | null>(null);
  accessToken = signal<string | null>(this.getTokenFromSessionStorage());
  platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);
  isAuthenticated = computed(() => this.accessToken() !== null);
  router = inject(Router);

  login({ email, password }: { email: string; password: string }) {
    return this.httpClient
      .post<LoginResponseDTO>(`${environment.apiUrl}/api/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          this.handleAuthSuccess(response);
        }),
        catchError((error) => {
          this.handleAuthError();
          throw error;
        }),
      );
  }

  logout() {
    this.currentUser.set(null);
    this.accessToken.set(null);
    this.clearSessionStorage();
    this.router.navigate(['/login']);
  }

  handleAuthSuccess(response: LoginResponseDTO) {
    if (response.access_token) {
      this.currentUser.set({
        userId: response.userId!,
        email: response.email!,
      });
      this.accessToken.set(response.access_token);
      if (this.isBrowser) {
        sessionStorage.setItem(ACCESS_TOKEN, response.access_token);
      }
    }
  }

  handleAuthError() {
    this.currentUser.set(null);
    this.accessToken.set(null);
    if (this.isBrowser) {
      sessionStorage.removeItem(ACCESS_TOKEN);
    }
  }

  getTokenFromSessionStorage() {
    if (this.isBrowser) {
      return sessionStorage.getItem(ACCESS_TOKEN);
    }
    return null;
  }

  clearSessionStorage() {
    if (this.isBrowser) {
      sessionStorage.removeItem(ACCESS_TOKEN);
    }
  }
}
