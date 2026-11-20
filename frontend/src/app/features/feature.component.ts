import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="feature-page">
      <div class="feature-icon" aria-hidden="true">✦</div>
      <span class="eyebrow">ESPACE ASSOCIATIF</span>
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <div class="feature-status"><span class="status-dot"></span><span><strong>Cet espace est en préparation</strong><small>Cette rubrique sera disponible dans une prochaine mise à jour.</small></span></div>
      <a routerLink="/dashboard" class="back-link"><span aria-hidden="true">←</span> Retour à la vue d’ensemble</a>
    </section>
  `,
  styles: [`
    :host{display:block}.feature-page{display:flex;min-height:390px;flex-direction:column;align-items:flex-start;justify-content:center;padding:clamp(28px,5vw,56px);border:1px solid #e5ebe5;border-radius:20px;background:linear-gradient(135deg,#fff 0%,#f8faf6 100%);box-shadow:0 12px 32px rgb(22 51 35 / 5%)}.feature-icon{display:grid;width:47px;height:47px;place-items:center;margin-bottom:25px;border-radius:14px;background:#e8f3ed;color:#176b4d;font-size:22px}.eyebrow{color:#176b4d;font-size:10px;font-weight:800;letter-spacing:1.5px}.feature-page h1{margin:9px 0;color:#19352a;font:800 clamp(28px,4vw,40px)/1.15 'Manrope',sans-serif;letter-spacing:-1.2px}.feature-page>p{max-width:590px;margin:0;color:#6f8075;font-size:14px;line-height:1.75}.feature-status{display:flex;align-items:center;gap:12px;margin-top:28px;padding:14px 16px;border:1px solid #e5ebe5;border-radius:11px;background:#fff}.status-dot{width:8px;height:8px;flex:0 0 8px;border-radius:50%;background:#d7a93b;box-shadow:0 0 0 4px #fbf3dc}.feature-status>span:last-child{display:grid;gap:4px}.feature-status strong{color:#40584a;font-size:11px}.feature-status small{color:#87948b;font-size:10px}.back-link{display:inline-flex;align-items:center;gap:8px;margin-top:25px;color:#176b4d;text-decoration:none;font-size:11px;font-weight:700}.back-link:hover{color:#10563d}
  `]
})
export class FeatureComponent {
  private readonly route = inject(ActivatedRoute);
  get title(): string { return this.route.snapshot.data['title'] as string; }
  get description(): string { return this.route.snapshot.data['description'] as string; }
}
