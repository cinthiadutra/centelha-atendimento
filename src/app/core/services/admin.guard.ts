import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const adminGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.currentUser;
  if (!user) return router.createUrlTree(['/login']);

  const role = await authService.getUserRole(user.uid);
  return role === 'admin' ? true : router.createUrlTree(['/login']);
};
