import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <main class="login-page">
      <section class="login-panel">
        <a class="brand" routerLink="/" aria-label="Association Manager, accueil"><span class="brand-mark">A</span><span>Association<strong>Manager</strong></span></a>
        <div class="login-content">
          <span class="eyebrow">VOTRE ESPACE ASSOCIATIF</span>
          <h1>Ravi de vous retrouver.</h1>
          <p class="intro">Connectez-vous pour retrouver les informations et les outils de votre association.</p>
          <form (ngSubmit)="submit()" #loginForm="ngForm">
            <label for="email">Adresse e-mail</label>
            <input id="email" name="email" type="email" [(ngModel)]="email" required email autocomplete="username" placeholder="nom@association.org">
            <label for="password">Mot de passe</label>
            <input id="password" name="password" type="password" [(ngModel)]="password" required autocomplete="current-password" placeholder="Votre mot de passe">
            <button type="submit" [disabled]="loginForm.invalid || loading">{{ loading ? 'Connexion en cours…' : 'Se connecter' }}<span aria-hidden="true">→</span></button>
          </form>
          <div class="secure-note"><span>●</span><p>Connexion sécurisée<br><small>Vos informations restent confidentielles.</small></p></div>
          <p class="api-note">L’API doit être démarrée sur <code>localhost:8080</code>.</p>
        </div>
        <footer>AssociationManager · Votre engagement, mieux organisé.</footer>
      </section>
      <aside class="login-art"><div class="art-decoration art-circle"></div><div class="art-decoration art-ring"></div><div class="art-content"><span class="art-label">ENSEMBLE, ON VA PLUS LOIN</span><h2>Faites grandir<br>votre engagement.</h2><p>La plateforme qui simplifie la vie de votre association et vous aide à agir ensemble.</p><div class="art-line"></div><small>Un espace commun pour une action collective.</small></div><div class="art-landscape"><span></span><span></span><span></span></div></aside>
    </main>
  `,
  styles: [`
    :host{display:block;min-height:100vh;color:#172b24;font-family:'DM Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}.login-page{display:grid;min-height:100vh;grid-template-columns:minmax(430px,1fr) minmax(390px,.92fr);background:#fff}.login-panel{display:flex;flex-direction:column;justify-content:space-between;width:min(100%,680px);min-height:100vh;margin:0 auto;padding:31px clamp(28px,7vw,100px) 22px}.brand{display:flex;align-items:center;gap:10px;color:#19352a;text-decoration:none;font:750 13px 'Manrope',sans-serif}.brand>span:last-child{display:grid;gap:1px}.brand strong{color:#176b4d}.brand-mark{display:grid;width:38px;height:38px;place-items:center;border-radius:12px;background:#176b4d;color:#fff;font:800 21px 'Manrope',sans-serif}.login-content{width:100%;max-width:390px;margin:48px auto}.eyebrow{color:#176b4d;font-size:10px;font-weight:800;letter-spacing:1.4px}.login-content h1{margin:12px 0 9px;color:#19352a;font:800 clamp(29px,3vw,37px)/1.2 'Manrope',sans-serif;letter-spacing:-1.1px}.intro{margin:0 0 27px;color:#718177;font-size:13px;line-height:1.7}.login-content form{display:grid;gap:9px}.login-content label{margin-top:9px;color:#344a3d;font-size:11px;font-weight:700}.login-content input{width:100%;height:46px;padding:0 13px;border:1px solid #dfe7df;border-radius:9px;background:#fff;color:#223a2d;font-size:12px}.login-content input::placeholder{color:#a5b0a7}.login-content form button{display:flex;height:47px;align-items:center;justify-content:space-between;margin-top:14px;padding:0 15px;border:0;border-radius:9px;background:#176b4d;color:#fff;font-size:12px;font-weight:700;transition:background .18s ease}.login-content form button:hover:not(:disabled){background:#10563d}.login-content form button:disabled{cursor:not-allowed;opacity:.65}.secure-note{display:flex;align-items:center;gap:10px;margin-top:22px;padding:13px;border:1px solid #e8eee8;border-radius:10px;background:#f8faf7}.secure-note>span{display:grid;width:27px;height:27px;place-items:center;border-radius:50%;background:#e4f2e8;color:#318258;font-size:9px}.secure-note p{margin:0;color:#425b4b;font-size:10px;font-weight:700;line-height:1.6}.secure-note small{color:#87948b;font-size:9px;font-weight:400}.api-note{margin-top:20px;color:#9aa59d;font-size:10px}.api-note code{color:#6e7c72}.login-panel footer{color:#94a097;font-size:9px}.login-art{position:relative;display:flex;min-height:100vh;align-items:center;overflow:hidden;padding:clamp(35px,7vw,92px);background:#164f3a;color:#fff}.art-content{position:relative;z-index:2;max-width:440px;margin-top:-30px}.art-label{display:inline-block;padding:8px 11px;border:1px solid rgb(255 255 255 / 25%);border-radius:20px;color:#e8d596;font-size:9px;font-weight:800;letter-spacing:1.2px}.art-content h2{margin:26px 0 14px;font:800 clamp(36px,4.5vw,56px)/1.12 'Manrope',sans-serif;letter-spacing:-1.8px}.art-content p{max-width:370px;color:#d4e4d8;font-size:14px;line-height:1.8}.art-line{width:43px;height:3px;margin:25px 0 12px;border-radius:2px;background:#e7bd55}.art-content>small{color:#c4d7c9;font-size:10px}.art-decoration{position:absolute;border-radius:50%}.art-circle{top:12%;right:-10%;width:310px;height:310px;background:rgb(233 192 81 / 12%)}.art-ring{right:18%;bottom:16%;width:240px;height:240px;border:1px solid rgb(255 255 255 / 14%)}.art-landscape{position:absolute;right:0;bottom:0;left:0;height:150px;overflow:hidden}.art-landscape span{position:absolute;right:-5%;bottom:-110px;width:75%;height:220px;border-radius:50%;background:#236448}.art-landscape span:nth-child(2){right:33%;bottom:-145px;width:65%;background:#317452}.art-landscape span:nth-child(3){right:-25%;bottom:-160px;width:65%;background:#47805b}
    @media(max-width:820px){.login-page{grid-template-columns:1fr}.login-panel{width:100%;max-width:600px;min-height:100vh;padding:25px 34px 18px}.login-content{margin:55px auto}.login-art{display:none}}
    @media(max-width:480px){.login-panel{padding-right:22px;padding-left:22px}.login-content{margin:44px auto}.login-content h1{font-size:30px}}
  `]
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly notifications = inject(NotificationService);
  email = '';
  password = '';
  loading = false;

  submit(): void {
    if (this.loading) return;
    this.loading = true;
    this.auth.login({ email: this.email.trim(), password: this.password }).subscribe({
      next: () => {
        this.loading = false;
        this.notifications.success('Connexion réussie.');
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
        void this.router.navigateByUrl(returnUrl);
      },
      error: () => { this.loading = false; }
    });
  }
}
