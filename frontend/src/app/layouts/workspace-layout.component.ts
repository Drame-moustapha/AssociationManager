import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../core/auth/services/auth.service';
import { BackendRole } from '../core/auth/models/user.model';
import { NotificationService } from '../core/services/notification.service';

@Component({
  selector: 'app-workspace-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="workspace" [class.menu-open]="menuOpen">
      <aside class="sidebar" aria-label="Navigation principale">
        <a class="brand" routerLink="/dashboard" aria-label="Association Manager, accueil">
          <span class="brand-mark">A</span>
          <span class="brand-name">Association<strong>Manager</strong></span>
        </a>

        <div class="organization">
          <span class="organization-mark">{{ orgInitial }}</span>
          <span class="organization-copy"><strong>{{ orgName }}</strong><small>{{ roleLabel }}</small></span>
          <span class="organization-chevron" aria-hidden="true">⌄</span>
        </div>

        <p class="nav-caption">MENU PRINCIPAL</p>
        <nav class="navigation">
          <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" (click)="closeMenu()"><span class="nav-icon">⌂</span>Vue d’ensemble</a>
          @if (isAdmin) { <a routerLink="/associations" routerLinkActive="active" (click)="closeMenu()"><span class="nav-icon">◈</span>Associations</a> }
          <a routerLink="/members" routerLinkActive="active" (click)="closeMenu()"><span class="nav-icon">♙</span>Membres</a>
          <a routerLink="/governance" routerLinkActive="active" (click)="closeMenu()"><span class="nav-icon">♧</span>Bureau & gouvernance</a>
          <a routerLink="/activities" routerLinkActive="active" (click)="closeMenu()"><span class="nav-icon">◷</span>Activités</a>
          <a routerLink="/meetings" routerLinkActive="active" (click)="closeMenu()"><span class="nav-icon">▦</span>Réunions</a>
          <a routerLink="/finance" routerLinkActive="active" (click)="closeMenu()"><span class="nav-icon">₣</span>Cotisations & finances</a>
          <a routerLink="/documents" routerLinkActive="active" (click)="closeMenu()"><span class="nav-icon">▤</span>Documents</a>
        </nav>

        <div class="sidebar-bottom">
          <p class="nav-caption">COMPTE</p>
          <a routerLink="/profile" routerLinkActive="active" (click)="closeMenu()"><span class="nav-icon">⚙</span>Mon profil</a>
          <button type="button" class="logout" (click)="logout()"><span class="nav-icon">↪</span>Se déconnecter</button>
          <div class="sidebar-help"><span class="help-mark">✦</span><strong>Un espace pour agir ensemble</strong><small>La vie de votre association, simplement.</small></div>
        </div>
      </aside>

      <div class="main-area">
        <header class="topbar">
          <button class="menu-toggle" type="button" (click)="menuOpen = !menuOpen" [attr.aria-expanded]="menuOpen" aria-label="Ouvrir ou fermer le menu">☰</button>
          <div class="breadcrumb"><span>Mon espace</span><span class="breadcrumb-divider">/</span><strong>{{ pageName }}</strong></div>
          <div class="topbar-user"><span class="online-dot"></span><span class="user-avatar">{{ initials }}</span><span class="topbar-user-copy"><strong>{{ displayName }}</strong><small>{{ roleLabel }}</small></span></div>
        </header>
        <main class="page-content"><router-outlet /></main>
        <footer class="workspace-footer"><span>AssociationManager</span><span>Ensemble, faisons grandir nos associations.</span></footer>
      </div>
      @if (menuOpen) { <button class="scrim" type="button" aria-label="Fermer la navigation" (click)="closeMenu()"></button> }
    </div>
  `,
  styles: [`
    :host{display:block;min-height:100vh;color:#172b24;font-family:'DM Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
    .workspace{min-height:100vh;background:#f5f7f3}.sidebar{position:fixed;inset:0 auto 0 0;z-index:30;display:flex;width:258px;flex-direction:column;padding:25px 17px 18px;background:#fff;border-right:1px solid #e7ece7}
    .brand{display:flex;align-items:center;gap:11px;padding:2px 8px 26px;text-decoration:none}.brand-mark{display:grid;width:38px;height:38px;place-items:center;border-radius:12px;background:#176b4d;color:#fff;font:800 21px 'Manrope',sans-serif}.brand-name{display:flex;flex-direction:column;color:#19352a;font:700 14px 'Manrope',sans-serif;line-height:1.25}.brand-name strong{color:#176b4d;font-size:13px}
    .organization{display:flex;align-items:center;gap:10px;padding:12px;border:1px solid #e8eee8;border-radius:12px;background:#fbfcfa}.organization-mark{display:grid;width:36px;height:36px;flex:0 0 36px;place-items:center;border-radius:10px;background:#e8f3ed;color:#176b4d;font:800 15px 'Manrope',sans-serif}.organization-copy{display:grid;min-width:0;gap:3px}.organization-copy strong{overflow:hidden;color:#20382c;font-size:12px;text-overflow:ellipsis;white-space:nowrap}.organization-copy small{color:#78877e;font-size:10px}.organization-chevron{margin-left:auto;color:#87958c}
    .nav-caption{margin:27px 10px 9px;color:#99a49c;font-size:9px;font-weight:800;letter-spacing:1.25px}.navigation{display:grid;gap:4px}.navigation a,.sidebar-bottom>a,.logout{display:flex;min-height:41px;align-items:center;gap:12px;padding:0 11px;border:0;border-radius:9px;background:transparent;color:#607168;text-align:left;text-decoration:none;font-size:12px;font-weight:600;transition:background .16s ease,color .16s ease}.navigation a:hover,.sidebar-bottom>a:hover,.logout:hover{background:#f3f7f3;color:#176b4d}.navigation a.active,.sidebar-bottom>a.active{background:#e8f3ed;color:#176b4d;font-weight:700}.nav-icon{display:inline-grid;width:18px;place-items:center;color:inherit;font-size:17px}.sidebar-bottom{margin-top:auto}.sidebar-bottom .nav-caption{margin-top:12px}.logout{width:100%;cursor:pointer;font-family:inherit}.sidebar-help{display:grid;gap:6px;margin-top:18px;padding:14px;border:1px solid #e6eee7;border-radius:12px;background:#f7faf6}.help-mark{color:#b88925}.sidebar-help strong{color:#294637;font-size:11px}.sidebar-help small{color:#77867d;font-size:10px;line-height:1.5}
    .main-area{min-height:100vh;margin-left:258px}.topbar{position:sticky;top:0;z-index:20;display:flex;height:70px;align-items:center;justify-content:space-between;padding:0 36px;border-bottom:1px solid #e8ede8;background:rgb(255 255 255 / 94%);backdrop-filter:blur(12px)}.breadcrumb{display:flex;align-items:center;gap:10px;color:#819087;font-size:12px}.breadcrumb-divider{color:#c3ccc4}.breadcrumb strong{color:#294637;font-weight:700}.topbar-user{display:flex;align-items:center;gap:10px}.online-dot{width:7px;height:7px;border-radius:50%;background:#48a879;box-shadow:0 0 0 3px #e9f5ed}.user-avatar{display:grid;width:34px;height:34px;place-items:center;border-radius:50%;background:#e8f3ed;color:#176b4d;font-size:11px;font-weight:800}.topbar-user-copy{display:grid;gap:2px}.topbar-user-copy strong{color:#294637;font-size:11px}.topbar-user-copy small{color:#839087;font-size:10px}.page-content{width:min(1200px,100%);margin:0 auto;padding:35px 36px 25px;min-height:calc(100vh - 112px)}.workspace-footer{display:flex;justify-content:space-between;padding:17px 36px;border-top:1px solid #e8ede8;color:#89968e;font-size:10px}.workspace-footer span:first-child{color:#527260;font-weight:700}.menu-toggle{display:none}.scrim{display:none}
    @media(max-width:900px){.sidebar{width:236px}.main-area{margin-left:236px}.topbar{padding:0 24px}.page-content{padding:28px 24px 22px}.workspace-footer{padding-right:24px;padding-left:24px}}
    @media(max-width:700px){.sidebar{z-index:50;transform:translateX(-100%);transition:transform .22s ease}.menu-open .sidebar{transform:translateX(0)}.main-area{margin-left:0}.topbar{height:62px;justify-content:flex-start;gap:15px;padding:0 17px}.menu-toggle{display:grid;width:34px;height:34px;place-items:center;border:1px solid #e4ebe4;border-radius:9px;background:#fff;color:#315542;font-size:17px}.breadcrumb{font-size:11px}.topbar-user{margin-left:auto}.topbar-user-copy,.online-dot{display:none}.page-content{padding:24px 17px;min-height:calc(100vh - 106px)}.workspace-footer{gap:8px;padding:14px 17px;font-size:9px}.scrim{position:fixed;inset:0;z-index:40;display:block;width:100%;height:100%;border:0;background:rgb(18 35 27 / 35%)}}
    @media(max-width:420px){.workspace-footer span:last-child{max-width:55%;text-align:right}}
  `]
})
export class WorkspaceLayoutComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly notifications = inject(NotificationService);
  menuOpen = false;

  get user() { return this.auth.user; }
  get email(): string { return this.user?.email ?? ''; }
  get role(): BackendRole | undefined { return this.user?.role; }
  get isAdmin(): boolean { return this.role === 'ADMIN'; }
  get roleLabel(): string { return ({ ADMIN: 'Administrateur', ASSOCIATION_ADMIN: 'Admin association', MEMBER: 'Membre' } as Record<string, string>)[this.role ?? 'MEMBER']; }
  get orgName(): string { return this.user?.associationId ? 'Mon association' : 'Administration'; }
  get orgInitial(): string { return this.orgName.charAt(0); }
  get displayName(): string { return this.email.split('@')[0] || 'Utilisateur'; }
  get initials(): string { return (this.displayName.match(/\b\w/g) ?? [this.displayName.charAt(0)]).slice(0, 2).join('').toUpperCase(); }
  get pageName(): string {
    const path = this.router.url.split('?')[0];
    return ({ '/dashboard': 'Vue d’ensemble', '/associations': 'Associations', '/members': 'Membres', '/governance': 'Bureau & gouvernance', '/activities': 'Activités', '/meetings': 'Réunions', '/finance': 'Cotisations & finances', '/documents': 'Documents', '/profile': 'Mon profil' } as Record<string, string>)[path] ?? 'Mon espace';
  }
  closeMenu(): void { this.menuOpen = false; }
  logout(): void {
    this.auth.logout().subscribe({
      next: () => { void this.router.navigate(['/login']); this.notifications.info('Vous êtes déconnecté.'); },
      error: () => { this.auth.clearSession(); void this.router.navigate(['/login']); }
    });
  }
}
