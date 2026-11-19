import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BackendRole } from '../auth/models/user.model';
import { AuthService } from '../auth/services/auth.service';

export const roleGuard: CanActivateFn = route => {
  const user = inject(AuthService).user;
  const allowed = route.data['roles'] as BackendRole[] | undefined;
  return !allowed || (user && allowed.includes(user.role)) ? true : inject(Router).createUrlTree(['/dashboard']);
};
