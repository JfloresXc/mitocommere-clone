import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { AlertService } from '@/shared/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
})
export class LoginForm {
  authService = inject(AuthService);
  alertService = inject(AlertService);
  router = inject(Router);
  isLoading = signal(false);

  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4)],
    }),
  });

  onSubmit() {
    this.isLoading.set(true);
    if (this.loginForm.valid) {
      const { email = '', password = '' } = this.loginForm.value;
      this.authService.login({ email, password }).subscribe({
        next: () => {
          this.alertService.showAlert({
            message: 'Inicio de sesión exitoso',
            type: 'success',
          });
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.alertService.showAlert({
            message: error.message,
            type: 'error',
          });
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
    }
  }
}
