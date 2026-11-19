import { Injectable, signal } from '@angular/core';

export interface Notice { id: number; message: string; kind: 'success' | 'error' | 'info'; }

@Injectable({ providedIn: 'root' })
export class NotificationService {
  readonly notices = signal<Notice[]>([]);
  private sequence = 0;
  success(message: string): void { this.add(message, 'success'); }
  error(message: string): void { this.add(message, 'error'); }
  info(message: string): void { this.add(message, 'info'); }
  dismiss(id: number): void { this.notices.update(items => items.filter(item => item.id !== id)); }
  private add(message: string, kind: Notice['kind']): void {
    const id = ++this.sequence;
    this.notices.update(items => [...items, { id, message, kind }]);
    setTimeout(() => this.dismiss(id), 5000);
  }
}
