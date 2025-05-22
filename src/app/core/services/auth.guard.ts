import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return new Promise(resolve => {
    const sub = authService.user$.subscribe(user => {
      sub.unsubscribe();
      resolve(user ? true : router.createUrlTree(['/login']));
    });
  });
};
