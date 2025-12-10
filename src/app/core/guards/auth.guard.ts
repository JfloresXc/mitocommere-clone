import { AuthService } from '@/modules/auth/services/auth-service';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    return true;
  }

  authService.router.navigate(['/login']);
  return false;
};
