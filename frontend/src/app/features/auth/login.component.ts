import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({ selector: 'app-login', standalone: true, imports: [FormsModule], template: `
  <main class="auth-page"><section class="auth-card"><a class="brand" routerLink="/"><span class="brand-icon">A</span><strong>Association<span>Manager</span></strong></a>
    <div class="intro"><span class="eyebrow">VOTRE ESPACE ASSOCIATIF</span><h1>Bon retour parmi nous</h1><p>Connectez-vous pour accéder à votre espace.</p></div>
    <form (ngSubmit)="submit()" #loginForm="ngForm"><label for="email">Adresse e-mail</label><input id="email" name="email" type="email" [(ngModel)]="email" required email autocomplete="username" placeholder="vous@association.fr"><label for="password">Mot de passe</label><input id="password" name="password" type="password" [(ngModel)]="password" required autocomplete="current-password" placeholder="Votre mot de passe"><button class="submit" type="submit" [disabled]="loginForm.invalid || loading">{{ loading ? 'Connexion…' : 'Se connecter' }}</button></form>
    <p class="security">Connexion sécurisée · Vos données restent confidentielles</p><p class="api-note">L’API doit être démarrée sur <code>localhost:8080</code>.</p>
  </section><div class="auth-art"><div class="art-content"><span class="art-badge">ENSEMBLE, ON VA PLUS LOIN</span><h2>Faites grandir<br>votre engagement.</h2><p>La plateforme qui simplifie la vie de votre association et rapproche ses membres.</p><div class="art-dots"><i></i><i></i><i></i></div></div></div></main>
`, styles: [`:host{display:block;min-height:100vh;font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#1b2940}.auth-page{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;background:#fff}.auth-card{width:min(420px,calc(100% - 48px));margin:auto;padding:35px 0}.brand{display:flex;align-items:center;gap:10px;color:#192840;text-decoration:none;font-size:16px}.brand>strong span{color:#5270dc}.brand-icon{width:36px;height:36px;border-radius:11px;background:#4f6fe0;color:white;display:grid;place-items:center;font-size:21px;font-weight:800}.intro{margin:65px 0 30px}.eyebrow{font-size:10px;letter-spacing:1.3px;color:#6379cd;font-weight:750}.intro h1{font-size:28px;letter-spacing:-.7px;margin:12px 0 8px}.intro p,.security,.api-note{font-size:13px;color:#8a95a6}.auth-card form{display:grid;gap:9px}.auth-card label{margin-top:11px;font-size:12px;font-weight:650;color:#354158}.auth-card input{height:46px;padding:0 13px;border:1px solid #e1e6ef;border-radius:7px;outline:none;font-size:13px}.auth-card input:focus{border-color:#607be0;box-shadow:0 0 0 3px #607be01a}.submit{height:46px;margin-top:16px;background:#4d6cdd;color:white;border:0;border-radius:7px;font-size:13px;font-weight:650}.submit:disabled{opacity:.55;cursor:not-allowed}.security{text-align:center;margin-top:24px;font-size:11px}.api-note{text-align:center;font-size:10px}.api-note code{color:#596a8c}.auth-art{position:relative;overflow:hidden;display:flex;align-items:flex-end;padding:10% 12%;background:radial-gradient(ellipse at 75% 20%,#7489e6 0,transparent 35%),linear-gradient(145deg,#364c9b,#253779 65%,#1e2d62);color:white}.auth-art:before,.auth-art:after{content:"";position:absolute;border:1px solid #ffffff24;border-radius:50%;width:520px;height:520px;right:-140px;top:-150px}.auth-art:after{width:370px;height:370px;right:-70px;top:-75px}.art-content{position:relative;z-index:1;max-width:440px;margin-bottom:8%}.art-badge{padding:8px 11px;border:1px solid #ffffff4a;border-radius:30px;font-size:9px;letter-spacing:1px}.art-content h2{font-size:clamp(34px,4vw,54px);line-height:1.08;letter-spacing:-1.6px;margin:28px 0 15px}.art-content p{max-width:360px;color:#d4dcff;font-size:14px;line-height:1.7}.art-dots{display:flex;gap:6px;margin-top:35px}.art-dots i{width:6px;height:6px;background:#fff;border-radius:50%;opacity:.55}.art-dots i:first-child{width:21px;border-radius:6px;opacity:1}@media(max-width:760px){.auth-page{grid-template-columns:1fr}.auth-art{display:none}.auth-card{padding:28px 0}.intro{margin:54px 0 26px}}`]
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly notifications = inject(NotificationService);
  email = ''; password = ''; loading = false;
  submit(): void {
    if (this.loading) return;
    this.loading = true;
    this.auth.login({ email: this.email.trim(), password: this.password }).subscribe({
      next: () => { this.loading = false; this.notifications.success('Connexion réussie.'); const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard'; void this.router.navigateByUrl(returnUrl); },
      error: () => { this.loading = false; }
    });
  }
}
