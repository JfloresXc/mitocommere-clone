import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@envs/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(HttpClient);

  login({ email, password }: { email: string; password: string }) {
    return this.httpClient.post(`${environment.apiUrl}/api/auth/login`, {
      email,
      password,
    });
  }
}
