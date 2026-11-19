import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationService } from './core/services/notification.service';

@Component({
  selector: 'app-root', standalone: true, imports: [RouterOutlet],
  template: `<router-outlet /><section class="toast-stack" aria-live="polite">@for (notice of notifications.notices(); track notice.id) { <div class="toast" [class]="'toast ' + notice.kind"><span>{{ notice.message }}</span><button type="button" (click)="notifications.dismiss(notice.id)" aria-label="Fermer">×</button></div> }</section>`,
  styles: [`.toast-stack{position:fixed;right:20px;top:18px;z-index:100;display:grid;gap:8px;width:min(380px,calc(100vw - 32px))}.toast{display:flex;justify-content:space-between;align-items:center;padding:13px 15px;border-radius:10px;background:white;box-shadow:0 8px 30px #1c2b441f;border-left:4px solid #5874df;font-size:13px;color:#25334a}.toast.success{border-color:#28a77a}.toast.error{border-color:#d94e54}.toast button{border:0;background:none;color:#718096;font-size:20px}`]
})
export class AppComponent { readonly notifications = inject(NotificationService); }
