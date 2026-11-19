import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../core/auth/services/auth.service';
import { BackendRole } from '../core/auth/models/user.model';
import { NotificationService } from '../core/services/notification.service';

@Component({ selector: 'app-workspace-layout', standalone: true, imports: [RouterLink, RouterLinkActive, RouterOutlet], template: `
  <div class="shell" [class.open]="menuOpen"><aside class="sidebar"><a class="brand" routerLink="/dashboard"><span class="brand-icon">A</span><span>Association<strong>Manager</strong></span></a>
    <div class="org"><span class="org-mark">{{ orgInitial }}</span><span><b>{{ orgName }}</b><small>{{ roleLabel }}</small></span></div>
    <p class="nav-title">ESPACE ASSOCIATIF</p><nav>
      <a routerLink="/dashboard" routerLinkActive="active" (click)="menuOpen=false"><span>⌂</span>Vue d’ensemble</a>
      @if (isAdmin) { <a routerLink="/associations" routerLinkActive="active" (click)="menuOpen=false"><span>◈</span>Associations</a> }
      <a routerLink="/members" routerLinkActive="active" (click)="menuOpen=false"><span>♙</span>Membres</a>
      <a routerLink="/governance" routerLinkActive="active" (click)="menuOpen=false"><span>♧</span>Bureau & gouvernance</a>
      <a routerLink="/activities" routerLinkActive="active" (click)="menuOpen=false"><span>◷</span>Activités</a>
      <a routerLink="/meetings" routerLinkActive="active" (click)="menuOpen=false"><span>▦</span>Réunions</a>
      <a routerLink="/finance" routerLinkActive="active" (click)="menuOpen=false"><span>€</span>Cotisations & finances</a>
      <a routerLink="/documents" routerLinkActive="active" (click)="menuOpen=false"><span>▤</span>Documents</a>
    </nav><div class="sidebar-bottom"><a routerLink="/profile" routerLinkActive="active"><span>⚙</span>Mon profil</a><button type="button" class="logout" (click)="logout()"><span>↪</span>Se déconnecter</button><div class="user"><i>{{ initials }}</i><span><b>{{ email }}</b><small>{{ roleLabel }}</small></span></div></div></aside>
    <main class="main"><header class="topbar"><button class="menu-toggle" type="button" (click)="menuOpen=!menuOpen" aria-label="Ouvrir la navigation">☰</button><span class="crumb">Mon espace <b>/</b> AssociationManager</span><div class="top-right"><span class="live-dot"></span><span>Connecté</span><i>{{ initials }}</i></div></header><div class="page-body"><router-outlet /></div><footer>© 2026 AssociationManager <span>La vie associative, simplement.</span></footer></main>
    @if (menuOpen) { <button class="scrim" type="button" aria-label="Fermer la navigation" (click)="menuOpen=false"></button> }
  </div>
`, styles: [`:host{display:block;min-height:100vh;font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#1b2940}.shell{min-height:100vh;background:#f7f8fc}.sidebar{position:fixed;inset:0 auto 0 0;width:250px;padding:22px 15px 14px;background:white;border-right:1px solid #e9edf3;display:flex;flex-direction:column;z-index:5}.brand{display:flex;align-items:center;gap:10px;padding:0 7px 25px;color:#243148;text-decoration:none;font-size:14px;font-weight:650}.brand-icon{width:34px;height:34px;display:grid;place-items:center;border-radius:10px;background:#4b6bdd;color:#fff;font-size:20px;font-weight:800}.brand strong{display:block;color:#5070dc}.org{display:flex;align-items:center;gap:10px;padding:10px;background:#f7f8fc;border:1px solid #edf0f5;border-radius:9px}.org-mark{width:32px;height:32px;border-radius:9px;display:grid;place-items:center;background:#e8edff;color:#4e6cdc;font-weight:800}.org b,.org small,.user b,.user small{display:block}.org b{font-size:11px}.org small,.user small{margin-top:4px;color:#909bad;font-size:10px}.nav-title{margin:27px 9px 10px;color:#a0a9b7;font-size:9px;letter-spacing:1px;font-weight:750}nav{display:grid;gap:4px}nav a,.sidebar-bottom>a,.logout{height:39px;padding:0 10px;display:flex;align-items:center;gap:11px;border-radius:7px;color:#667287;text-decoration:none;font-size:11px}nav a>span,.sidebar-bottom>a>span,.logout>span{width:17px;text-align:center;font-size:15px}nav a:hover,nav a.active,.sidebar-bottom>a.active{background:#edf1ff;color:#4666d4;font-weight:650}.sidebar-bottom{margin-top:auto}.sidebar-bottom>a{margin-bottom:3px}.logout{width:100%;border:0;background:transparent;text-align:left;cursor:pointer}.logout:hover{background:#fff0f0;color:#cb5555}.user{margin-top:11px;padding:12px 4px 2px;border-top:1px solid #edf0f4;display:flex;align-items:center;gap:9px}.user i,.top-right i{width:31px;height:31px;display:grid;place-items:center;border-radius:50%;background:#e8edff;color:#4f69c4;font-size:10px;font-weight:750;font-style:normal}.user b{max-width:160px;overflow:hidden;text-overflow:ellipsis;font-size:10px}.main{margin-left:250px;min-height:100vh;display:flex;flex-direction:column}.topbar{height:62px;padding:0 30px;display:flex;align-items:center;justify-content:space-between;background:#fff;border-bottom:1px solid #eaedf3}.crumb{font-size:11px;color:#7e899b}.crumb b{padding:0 8px;color:#c5ccd6}.top-right{display:flex;align-items:center;gap:7px;color:#8792a3;font-size:10px}.live-dot{width:7px;height:7px;border-radius:50%;background:#36b582}.top-right i{margin-left:10px}.page-body{width:100%;max-width:1450px;padding:30px 32px;margin:0 auto;flex:1}footer{display:flex;justify-content:space-between;padding:15px 32px;color:#a1aab8;font-size:9px}.menu-toggle{display:none}.scrim{display:none}@media(max-width:760px){.sidebar{transform:translateX(-102%);transition:transform .2s ease;box-shadow:none}.open .sidebar{transform:translateX(0);box-shadow:8px 0 25px #17243a20}.main{margin-left:0}.topbar{height:56px;padding:0 15px;justify-content:flex-start;gap:11px}.menu-toggle{display:block;border:0;background:none;color:#59677e;font-size:18px}.crumb{flex:1}.page-body{padding:22px 15px}footer{padding:13px 15px}.scrim{display:block;position:fixed;inset:0;z-index:4;border:0;background:#101a2b55}}`]
})
export class WorkspaceLayoutComponent {
  private readonly auth = inject(AuthService); private readonly router = inject(Router); private readonly notifications = inject(NotificationService);
  menuOpen = false;
  get user() { return this.auth.user; }
  get email(): string { return this.user?.email ?? ''; }
  get role(): BackendRole | undefined { return this.user?.role; }
  get isAdmin(): boolean { return this.role === 'ADMIN'; }
  get roleLabel(): string { return ({ ADMIN: 'Administrateur', ASSOCIATION_ADMIN: 'Admin association', MEMBER: 'Membre' } as Record<string,string>)[this.role ?? 'MEMBER']; }
  get orgName(): string { return this.user?.associationId ? 'Mon association' : 'Administration'; }
  get orgInitial(): string { return this.orgName.charAt(0); }
  get initials(): string { return (this.email.split('@')[0] || 'U').slice(0,2).toUpperCase(); }
  logout(): void { this.auth.logout().subscribe({ next: () => { void this.router.navigate(['/login']); this.notifications.info('Vous êtes déconnecté.'); }, error: () => { this.auth.clearSession(); void this.router.navigate(['/login']); } }); }
}
