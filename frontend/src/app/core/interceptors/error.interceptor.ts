import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  const notifications = inject(NotificationService);
  return next(request).pipe(catchError((error: HttpErrorResponse) => {
    if (request.url.includes('/auth/refresh')) return throwError(() => error);
    const message = error.status === 0 ? 'Impossible de joindre le serveur. Vérifiez que l’API est démarrée.'
      : error.status === 401 ? 'Votre session a expiré ou vos identifiants sont incorrects.'
      : error.status === 403 ? 'Vous n’avez pas les autorisations nécessaires.'
      : error.error?.message ?? 'Une erreur est survenue. Veuillez réessayer.';
    notifications.error(message);
    return throwError(() => error);
  }));
};
