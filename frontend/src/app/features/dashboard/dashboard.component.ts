import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="welcome-banner">
      <div class="welcome-copy"><span class="eyebrow">VOTRE ESPACE ASSOCIATIF</span><h1>Bonjour {{ firstName }} <span aria-hidden="true">👋</span></h1><p>Bienvenue dans votre espace. Retrouvez ici les outils pour faire vivre votre association au quotidien.</p></div>
      <div class="banner-art" aria-hidden="true"><span class="sun"></span><span class="hill hill-back"></span><span class="hill hill-front"></span><span class="leaf leaf-one">✦</span><span class="leaf leaf-two">✦</span></div>
    </section>

    <section class="section-heading"><div><span class="eyebrow">ACCÈS RAPIDE</span><h2>Que souhaitez-vous faire ?</h2><p>Accédez directement aux espaces que vous utilisez le plus.</p></div></section>
    <section class="quick-links" aria-label="Accès rapide">
      @if (isAdmin) { <a class="quick-card" routerLink="/associations"><span class="quick-icon green">◈</span><span class="quick-copy"><strong>Associations</strong><small>Gérer les structures de la plateforme</small></span><span class="arrow">↗</span></a> }
      <a class="quick-card" routerLink="/members"><span class="quick-icon gold">♙</span><span class="quick-copy"><strong>Membres</strong><small>Consulter le répertoire des membres</small></span><span class="arrow">↗</span></a>
      <a class="quick-card" routerLink="/activities"><span class="quick-icon blue">◷</span><span class="quick-copy"><strong>Activités</strong><small>Découvrir les activités associatives</small></span><span class="arrow">↗</span></a>
      <a class="quick-card" routerLink="/meetings"><span class="quick-icon purple">▦</span><span class="quick-copy"><strong>Réunions</strong><small>Consulter réunions et informations</small></span><span class="arrow">↗</span></a>
      <a class="quick-card" routerLink="/finance"><span class="quick-icon orange">₣</span><span class="quick-copy"><strong>Finances</strong><small>Suivre cotisations et collectes</small></span><span class="arrow">↗</span></a>
      <a class="quick-card" routerLink="/documents"><span class="quick-icon teal">▤</span><span class="quick-copy"><strong>Documents</strong><small>Retrouver les documents partagés</small></span><span class="arrow">↗</span></a>
    </section>

    <section class="bottom-grid">
      <article class="association-card"><div class="card-title"><span class="card-title-icon">♧</span><div><span class="eyebrow">MON ASSOCIATION</span><h2>{{ associationLabel }}</h2></div></div><p>Votre espace regroupe les informations et les outils liés à votre rôle dans l’association.</p><a routerLink="/profile" class="text-link">Consulter mon profil <span>→</span></a></article>
      <article class="note-card"><span class="note-mark">✦</span><div><span class="eyebrow">ENSEMBLE, ON AVANCE</span><h2>Un engagement qui grandit</h2><p>Organisez la vie associative, partagez les informations et gardez le lien avec vos membres depuis un seul espace.</p></div></article>
    </section>
  `,
  styles: [`
    :host{display:block}.welcome-banner{position:relative;display:flex;min-height:220px;align-items:center;overflow:hidden;padding:32px 38px;border-radius:20px;background:linear-gradient(112deg,#eaf4ed 0%,#f2f6ec 58%,#f9f1d9 100%)}.welcome-copy{position:relative;z-index:2;max-width:580px}.eyebrow{color:#176b4d;font-size:10px;font-weight:800;letter-spacing:1.45px}.welcome-copy h1{margin:12px 0 9px;color:#183b2c;font:800 clamp(28px,3.8vw,39px)/1.15 'Manrope',sans-serif;letter-spacing:-1.3px}.welcome-copy p,.section-heading p{max-width:560px;margin:0;color:#6d7f73;font-size:13px;line-height:1.7}.banner-art{position:absolute;right:4%;bottom:0;width:310px;height:200px}.sun{position:absolute;top:10px;right:56px;width:78px;height:78px;border-radius:50%;background:#efcf78}.hill{position:absolute;right:-20px;bottom:-38px;width:290px;height:150px;border-radius:50% 50% 0 0}.hill-back{right:60px;bottom:-48px;background:#b8d5be;transform:rotate(-12deg)}.hill-front{background:#679b76;transform:rotate(8deg)}.leaf{position:absolute;color:#fff4c9;font-size:26px}.leaf-one{right:190px;bottom:75px}.leaf-two{right:70px;bottom:108px;font-size:18px}
    .section-heading{display:flex;align-items:flex-end;justify-content:space-between;margin:33px 0 16px}.section-heading h2{margin:6px 0 4px;color:#20382c;font:750 20px 'Manrope',sans-serif;letter-spacing:-.4px}.section-heading p{font-size:12px}.quick-links{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px}.quick-card{display:flex;min-height:83px;align-items:center;gap:12px;padding:15px 14px;border:1px solid #e6ece6;border-radius:14px;background:#fff;box-shadow:0 7px 20px rgb(22 51 35 / 3%);text-decoration:none;transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease}.quick-card:hover{transform:translateY(-2px);border-color:#c5ddca;box-shadow:0 12px 24px rgb(22 51 35 / 8%)}.quick-icon{display:grid;width:39px;height:39px;flex:0 0 39px;place-items:center;border-radius:12px;font-size:18px}.quick-icon.green{background:#e6f3e9;color:#28794e}.quick-icon.gold{background:#fbf2da;color:#a47719}.quick-icon.blue{background:#eaf1f8;color:#4d76a2}.quick-icon.purple{background:#f1edfa;color:#7862a2}.quick-icon.orange{background:#fbefe5;color:#ad6d36}.quick-icon.teal{background:#e7f3f1;color:#43877c}.quick-copy{display:grid;min-width:0;gap:4px}.quick-copy strong{color:#294436;font-size:12px}.quick-copy small{overflow:hidden;color:#839087;font-size:10px;line-height:1.45;text-overflow:ellipsis}.arrow{margin-left:auto;color:#91a096;font-size:16px}.bottom-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:20px}.association-card,.note-card{min-height:158px;padding:19px;border:1px solid #e6ece6;border-radius:15px;background:#fff}.card-title{display:flex;align-items:center;gap:11px}.card-title-icon{display:grid;width:37px;height:37px;place-items:center;border-radius:11px;background:#e8f3ed;color:#176b4d;font-size:18px}.card-title h2,.note-card h2{margin:4px 0 0;color:#294436;font:750 15px 'Manrope',sans-serif}.association-card>p,.note-card p{margin:12px 0;color:#738278;font-size:11px;line-height:1.65}.text-link{display:inline-flex;align-items:center;gap:8px;color:#176b4d;text-decoration:none;font-size:11px;font-weight:700}.text-link:hover{color:#10563d}.note-card{display:flex;gap:14px;background:#f8faf5}.note-mark{display:grid;width:36px;height:36px;flex:0 0 36px;place-items:center;border-radius:11px;background:#f7edcf;color:#a47b20}.note-card h2{margin-top:6px}
    @media(max-width:900px){.quick-links{grid-template-columns:repeat(2,minmax(0,1fr))}.banner-art{right:-60px;opacity:.72}}
    @media(max-width:600px){.welcome-banner{min-height:208px;padding:26px 22px}.welcome-copy{max-width:90%}.welcome-copy p{max-width:380px}.banner-art{right:-170px;opacity:.3}.section-heading{margin-top:27px}.quick-links{gap:9px}.quick-card{min-height:78px;padding:12px 10px;gap:9px}.quick-icon{width:34px;height:34px;flex-basis:34px}.quick-copy strong{font-size:11px}.quick-copy small{font-size:9px}.bottom-grid{grid-template-columns:1fr;gap:10px;margin-top:13px}}
  `]
})
export class DashboardComponent {
  private readonly auth = inject(AuthService);
  get firstName(): string { return (this.auth.user?.email.split('@')[0] ?? 'vous').replace(/[._-]/g, ' '); }
  get associationLabel(): string { return this.auth.user?.associationId ? 'Mon association' : 'Espace administration'; }
  get isAdmin(): boolean { return this.auth.user?.role === 'ADMIN'; }
}
