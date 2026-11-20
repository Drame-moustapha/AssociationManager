import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/auth.model';

/** Keeps both tokens in memory; no credentials are written to localStorage. */
@Injectable({ providedIn: 'root' })
export class TokenService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  setTokens(response: AuthResponse): void {
    this.accessToken = response.accessToken;
    this.refreshToken = response.refreshToken;
  }

  getAccessToken(): string | null { return this.accessToken; }
  getRefreshToken(): string | null { return this.refreshToken; }

  clear(): void {
    this.accessToken = null;
    this.refreshToken = null;
  }
}
