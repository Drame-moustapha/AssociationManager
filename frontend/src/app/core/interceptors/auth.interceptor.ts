import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, finalize, shareReplay, switchMap, throwError } from 'rxjs';
import { AuthResponse } from '../auth/models/auth.model';
import { AuthService } from '../auth/services/auth.service';
import { TokenService } from '../auth/services/token.service';

let refreshRequest: Observable<AuthResponse> | null = null;

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const tokens = inject(TokenService);
  const auth = inject(AuthService);
  const router = inject(Router);
  const token = tokens.getAccessToken();

  if (!token || request.url.includes('/auth/')) return next(request);

  return next(request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })).pipe(
    catchError((error: unknown) => {
      if (!(error instanceof HttpErrorResponse) || error.status !== 401 || !tokens.getRefreshToken()) {
        return throwError(() => error);
      }

      if (!refreshRequest) {
        refreshRequest = auth.refresh().pipe(
          finalize(() => { refreshRequest = null; }),
          shareReplay({ bufferSize: 1, refCount: false })
        );
      }

      return refreshRequest.pipe(
        catchError((refreshError: unknown) => {
          auth.clearSession();
          void router.navigate(['/login']);
          return throwError(() => refreshError);
        }),
        switchMap(() => {
          const renewedToken = tokens.getAccessToken();
          if (!renewedToken) {
            auth.clearSession();
            void router.navigate(['/login']);
            return throwError(() => new Error('Le renouvellement n’a pas fourni de jeton d’accès.'));
          }
          return next(request.clone({ setHeaders: { Authorization: `Bearer ${renewedToken}` } })).pipe(
            catchError((retryError: unknown) => {
              if (retryError instanceof HttpErrorResponse && retryError.status === 401) {
                auth.clearSession();
                void router.navigate(['/login']);
              }
              return throwError(() => retryError);
            })
          );
        })
      );
    })
  );
};
