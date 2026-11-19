import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

export const guestGuard: CanActivateFn = () => inject(AuthService).authenticated ? inject(Router).createUrlTree(['/dashboard']) : true;
