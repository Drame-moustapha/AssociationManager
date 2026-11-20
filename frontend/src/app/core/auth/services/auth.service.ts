import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthResponse, LoginRequest } from '../models/auth.model';
import { User } from '../models/user.model';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokens = inject(TokenService);
  private readonly userSubject = new BehaviorSubject<User | null>(null);
  readonly user$ = this.userSubject.asObservable();
  get user(): User | null { return this.userSubject.value; }
  get authenticated(): boolean { return !!this.tokens.getAccessToken(); }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, credentials).pipe(tap(response => this.accept(response)));
  }

  refresh(): Observable<AuthResponse> {
    const refreshToken = this.tokens.getRefreshToken();
    if (!refreshToken) throw new Error('Aucun jeton de renouvellement disponible.');
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/refresh`, { refreshToken }).pipe(tap(response => this.accept(response)));
  }

  logout(): Observable<void> {
    const refreshToken = this.tokens.getRefreshToken();
    if (!refreshToken) { this.clearSession(); return new Observable<void>(subscriber => { subscriber.next(); subscriber.complete(); }); }
    return this.http.post<void>(`${environment.apiUrl}/auth/logout`, { refreshToken }).pipe(tap(() => this.clearSession()));
  }

  clearSession(): void { this.tokens.clear(); this.userSubject.next(null); }

  private accept(response: AuthResponse): void {
    this.tokens.setTokens(response);
    this.userSubject.next({ userId: response.userId, email: response.email, role: response.role, associationId: response.associationId });
  }
}
