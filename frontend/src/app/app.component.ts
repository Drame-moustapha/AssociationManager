import { Component } from '@angular/core';

type Role = 'SUPER_ADMIN' | 'ADMIN' | 'PRESIDENT' | 'SECRETAIRE' | 'TRESORIER' | 'BUREAU_MEMBER' | 'MEMBER' | 'USER';
type NavItem = { label: string; icon: string; roles: Role[] };

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="app-shell" [class.sidebar-open]="sidebarOpen">
      <aside class="sidebar" aria-label="Navigation principale">
        <a class="brand" href="#" (click)="$event.preventDefault(); selectPage('Vue d’ensemble')">
          <span class="brand-mark">A</span>
          <span class="brand-name">asso<span>ciation</span><small>MANAGER</small></span>
        </a>

        <div class="workspace-label">ESPACE DE TRAVAIL</div>
        <button class="association-switch" type="button" aria-label="Association active">
          <span class="association-avatar">S</span>
          <span class="association-copy"><strong>Solidarité Active</strong><small>Association</small></span>
          <span class="chevron">⌄</span>
        </button>

        <div class="nav-label">MENU</div>
        <nav class="navigation">
          @for (item of visibleNavigation; track item.label) {
            <button type="button" class="nav-item" [class.active]="activePage === item.label"
              (click)="selectPage(item.label)" [attr.aria-current]="activePage === item.label ? 'page' : null">
              <span class="nav-icon" aria-hidden="true">{{ item.icon }}</span>
              <span>{{ item.label }}</span>
              @if (item.label === 'Messages') { <span class="nav-badge">3</span> }
            </button>
          }
        </nav>

        <div class="sidebar-bottom">
          <div class="help-card"><span class="help-icon">?</span><strong>Besoin d’aide ?</strong><p>Notre équipe est là pour vous accompagner.</p><button type="button" (click)="selectPage('Centre d’aide')">Consulter le centre d’aide <span>→</span></button></div>
          <button class="profile" type="button" (click)="roleMenuOpen = !roleMenuOpen" [attr.aria-expanded]="roleMenuOpen">
            <span class="profile-avatar">{{ initials }}</span>
            <span class="profile-copy"><strong>{{ userName }}</strong><small>{{ roleLabel }}</small></span>
            <span class="profile-more">···</span>
          </button>
          @if (roleMenuOpen) {
            <div class="role-menu">
              <span class="role-menu-title">APERÇU DES INTERFACES</span>
              @for (role of roles; track role.value) {
                <button type="button" [class.selected]="currentRole === role.value" (click)="selectRole(role.value)">
                  <span>{{ role.label }}</span>@if (currentRole === role.value) { <span>✓</span> }
                </button>
              }
            </div>
          }
        </div>
      </aside>

      <main class="main-area">
        <header class="topbar">
          <button type="button" class="mobile-menu" aria-label="Ouvrir le menu" (click)="sidebarOpen = !sidebarOpen">☰</button>
          <div class="breadcrumb"><span>Solidarité Active</span><span class="crumb-separator">/</span><strong>{{ activePage }}</strong></div>
          <div class="topbar-actions">
            <span class="today">Jeudi 19 novembre 2026</span>
            <button type="button" class="icon-button" aria-label="Rechercher">⌕</button>
            <button type="button" class="icon-button notification" aria-label="Notifications">♧<i></i></button>
            <span class="top-avatar">{{ initials }}</span>
          </div>
        </header>

        <div class="content">
          <div class="welcome-row">
            <div><p class="eyebrow">ESPACE ASSOCIATIF</p><h1>{{ activePage === 'Vue d’ensemble' ? greeting : activePage }}</h1>
              <p class="welcome-subtitle">{{ activePage === 'Vue d’ensemble' ? 'Voici ce qui se passe dans votre association aujourd’hui.' : pageDescription }}</p>
            </div>
            <button class="primary-button" type="button" (click)="selectPage(primaryActionTarget)"><span>＋</span> {{ primaryAction }}</button>
          </div>

          <section class="stats-grid" aria-label="Indicateurs clés">
            @for (stat of stats; track stat.label) {
              <article class="stat-card"><div class="stat-top"><span>{{ stat.label }}</span><span class="stat-icon" [class]="'stat-icon ' + stat.color">{{ stat.icon }}</span></div>
                <div class="stat-value">{{ stat.value }}</div><div class="stat-foot"><span class="trend">↗ {{ stat.change }}</span><span>{{ stat.period }}</span></div>
              </article>
            }
          </section>

          <section class="dashboard-grid">
            <article class="panel activity-panel">
              <div class="panel-heading"><div><h2>Activité de l’association</h2><p>Suivez les dernières actualités</p></div><button class="text-action" type="button" (click)="selectPage('Activités')">Tout voir <span>→</span></button></div>
              <div class="activity-chart" aria-label="Graphique de l’activité sur les six derniers mois">
                <div class="chart-y-labels"><span>80</span><span>60</span><span>40</span><span>20</span><span>0</span></div>
                <div class="chart-body"><div class="chart-gridlines"><i></i><i></i><i></i><i></i><i></i></div>
                  <div class="bars">
                    @for (bar of chartBars; track bar.month) { <div class="bar-group"><div class="bar-pair"><span class="bar primary-bar" [style.height.%]="bar.members"></span><span class="bar secondary-bar" [style.height.%]="bar.activities"></span></div><small>{{ bar.month }}</small></div> }
                  </div>
                </div>
              </div>
              <div class="chart-legend"><span><i class="legend-dot blue"></i>Membres actifs</span><span><i class="legend-dot mint"></i>Activités</span><span class="chart-period">6 derniers mois⌄</span></div>
            </article>

            <article class="panel events-panel">
              <div class="panel-heading"><div><h2>Prochains événements</h2><p>À ne pas manquer</p></div><button class="more-button" type="button" aria-label="Plus d’options">···</button></div>
              <div class="event-list">
                @for (event of events; track event.title) { <div class="event-row"><div class="event-date"><strong>{{ event.day }}</strong><span>{{ event.month }}</span></div><div class="event-info"><strong>{{ event.title }}</strong><span>{{ event.time }} · {{ event.place }}</span></div><span class="event-arrow">›</span></div> }
              </div>
              <button class="all-events" type="button" (click)="selectPage('Événements')">Voir le calendrier complet <span>→</span></button>
            </article>
          </section>

          <section class="bottom-grid">
            <article class="panel members-panel"><div class="panel-heading"><div><h2>Membres récemment actifs</h2><p>Les dernières personnes à rejoindre l’espace</p></div><button class="text-action" type="button" (click)="selectPage('Membres')">Voir tous <span>→</span></button></div>
              <div class="member-table"><div class="table-head"><span>MEMBRE</span><span>RÔLE</span><span>INSCRIT LE</span><span>STATUT</span></div>
                @for (member of members; track member.name) { <div class="member-row"><span class="member-cell"><i [class]="'member-avatar ' + member.color">{{ member.initials }}</i><strong>{{ member.name }}</strong></span><span class="member-role">{{ member.role }}</span><span class="member-date">{{ member.date }}</span><span><i class="status-pill">Actif</i></span></div> }
              </div>
            </article>
            <article class="panel tasks-panel"><div class="panel-heading"><div><h2>À faire</h2><p>Vos tâches en attente</p></div><span class="task-count">{{ tasks.length }}</span></div>
              @for (task of tasks; track task.title) { <button class="task-row" type="button" (click)="task.done = !task.done"><span class="checkbox" [class.checked]="task.done">@if (task.done) {✓}</span><span [class.task-done]="task.done">{{ task.title }}<small>{{ task.due }}</small></span><span class="task-arrow">›</span></button> }
              <button class="all-events task-action" type="button" (click)="selectPage('Tâches')">Voir toutes les tâches <span>→</span></button>
            </article>
          </section>
          <footer class="footer"><span>© 2026 AssociationManager</span><span>Fait avec soin pour les associations <i>♥</i></span></footer>
        </div>
      </main>
      @if (sidebarOpen) { <button class="mobile-overlay" aria-label="Fermer le menu" (click)="sidebarOpen = false"></button> }
    </div>
  `,
  styles: [`
    :host { display:block; min-height:100vh; color:#17243a; font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }
    * { box-sizing:border-box; }
    button { font:inherit; cursor:pointer; }
    .app-shell { min-height:100vh; background:#f7f8fc; }
    .sidebar { width:252px; position:fixed; inset:0 auto 0 0; z-index:5; display:flex; flex-direction:column; padding:24px 16px 14px; background:#fff; border-right:1px solid #e9edf3; }
    .brand { display:flex; align-items:center; gap:10px; height:42px; margin:0 0 34px 5px; color:#17243a; text-decoration:none; }
    .brand-mark { width:34px;height:34px;display:grid;place-items:center;border-radius:11px;background:#4169e1;color:#fff;font-size:21px;font-weight:800;box-shadow:0 5px 12px #4169e133; }
    .brand-name { font-size:17px;font-weight:800;letter-spacing:-.7px;line-height:15px; }.brand-name span{color:#4169e1}.brand-name small{display:block;color:#9aa4b6;font-size:8px;letter-spacing:2.1px;margin-top:5px}
    .workspace-label,.nav-label,.role-menu-title { color:#9aa4b5;font-size:9px;font-weight:750;letter-spacing:1.15px; }
    .workspace-label { margin:0 8px 11px; }.association-switch { width:100%;height:57px;display:flex;align-items:center;gap:10px;text-align:left;background:#f8f9fc;border:1px solid #edf0f5;border-radius:9px;padding:8px; }
    .association-avatar { width:34px;height:34px;display:grid;place-items:center;border-radius:9px;background:#e8edff;color:#4567d6;font-weight:800; }.association-copy,.profile-copy{display:grid;gap:4px;flex:1}.association-copy strong,.profile-copy strong{font-size:11px;font-weight:700}.association-copy small,.profile-copy small{color:#8994a6;font-size:10px}.chevron{color:#8490a2;font-size:17px;margin-right:3px}
    .nav-label { margin:29px 8px 10px; }.navigation { display:grid;gap:4px; }.nav-item { width:100%;height:40px;display:flex;align-items:center;gap:12px;padding:0 10px;border:0;border-radius:7px;background:transparent;color:#657187;text-align:left;font-size:12px;font-weight:550;transition:.18s; }.nav-item:hover{background:#f5f7fc;color:#3559c7}.nav-item.active{color:#3f61d3;background:#edf1ff;font-weight:700}.nav-icon{width:18px;text-align:center;font-size:16px;line-height:1}.nav-badge{margin-left:auto;background:#e8edff;color:#4566cc;border-radius:10px;padding:2px 7px;font-size:9px}
    .sidebar-bottom{margin-top:auto;position:relative}.help-card{padding:14px 12px 12px;background:#f7f8fc;border:1px solid #edf0f5;border-radius:9px;margin-bottom:13px}.help-icon{width:20px;height:20px;display:grid;place-items:center;background:#e6ebff;color:#4668da;border-radius:50%;font-size:12px;font-weight:800;margin-bottom:9px}.help-card strong{font-size:11px}.help-card p{color:#8994a6;font-size:10px;line-height:1.5;margin:5px 0 10px}.help-card button{padding:0;border:0;background:transparent;color:#4566d5;font-size:10px;font-weight:650}.help-card button span{margin-left:3px}.profile{width:100%;display:flex;align-items:center;gap:9px;padding:10px 4px 2px;background:white;border:0;border-top:1px solid #edf0f4;text-align:left}.profile-avatar,.top-avatar{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:#f3e5d7;color:#9d6340;font-size:11px;font-weight:750}.profile-more{color:#798498;font-weight:bold}.role-menu{position:absolute;bottom:51px;left:2px;right:2px;padding:10px;background:white;border:1px solid #e6eaf1;border-radius:10px;box-shadow:0 12px 35px #18284624;max-height:300px;overflow:auto}.role-menu-title{display:block;padding:5px 7px 8px;font-size:8px}.role-menu button{width:100%;display:flex;justify-content:space-between;padding:8px 7px;background:white;border:0;border-radius:6px;color:#58657a;text-align:left;font-size:10px}.role-menu button:hover,.role-menu button.selected{background:#eff2ff;color:#3f61d3}
    .main-area{margin-left:252px;min-height:100vh}.topbar{height:65px;display:flex;align-items:center;justify-content:space-between;padding:0 36px;background:#fff;border-bottom:1px solid #eaedf3}.breadcrumb{display:flex;align-items:center;gap:11px;color:#8994a5;font-size:11px}.breadcrumb strong{color:#344158;font-weight:650}.crumb-separator{color:#c3cad4}.topbar-actions{display:flex;align-items:center;gap:17px}.today{font-size:10px;color:#8490a2;padding-right:6px}.icon-button{width:31px;height:31px;position:relative;display:grid;place-items:center;border:1px solid #edf0f4;border-radius:8px;background:#fff;color:#657187;font-size:18px}.notification{font-size:16px}.notification i{position:absolute;top:6px;right:6px;width:5px;height:5px;border-radius:50%;background:#ee7d68;border:1px solid white}.top-avatar{width:30px;height:30px}.mobile-menu{display:none}
    .content{max-width:1450px;padding:30px 36px 15px;margin:0 auto}.welcome-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:25px}.eyebrow{font-size:9px;letter-spacing:1.35px;color:#7888bb;font-weight:750;margin:0 0 8px}.welcome-row h1{font-size:24px;letter-spacing:-.65px;margin:0;color:#17243a;font-weight:720}.welcome-subtitle{margin:7px 0 0;color:#8994a5;font-size:11px}.primary-button{display:flex;align-items:center;gap:8px;padding:10px 14px;border:0;border-radius:7px;background:#4668df;color:white;font-size:10px;font-weight:650;box-shadow:0 4px 9px #4668df26}.primary-button:hover{background:#3658cf}.primary-button span{font-size:16px;line-height:10px}
    .stats-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-bottom:16px}.stat-card,.panel{background:#fff;border:1px solid #eaedf3;border-radius:9px;box-shadow:0 2px 5px #1e34500a}.stat-card{padding:15px 16px 13px;min-height:113px}.stat-top{display:flex;align-items:center;justify-content:space-between;color:#7e899b;font-size:10px}.stat-icon{display:grid;place-items:center;width:29px;height:29px;border-radius:8px;font-size:14px}.icon-blue{background:#edf1ff;color:#4969db}.icon-green{background:#e8f7f0;color:#30a878}.icon-orange{background:#fff3e7;color:#e49a46}.icon-purple{background:#f2ecff;color:#8f68d8}.stat-value{margin:7px 0 5px;font-size:23px;letter-spacing:-.7px;font-weight:730;color:#1b2940}.stat-foot{display:flex;gap:6px;align-items:center;color:#a0a9b7;font-size:9px}.trend{color:#2fa97b;font-weight:700}
    .dashboard-grid{display:grid;grid-template-columns:minmax(0,1.56fr) minmax(290px,1fr);gap:15px;margin-bottom:15px}.panel{padding:17px 18px}.panel-heading{display:flex;align-items:flex-start;justify-content:space-between}.panel-heading h2{margin:0;color:#243148;font-size:12px;font-weight:700}.panel-heading p{margin:5px 0 0;color:#9aa3b1;font-size:9px}.text-action,.more-button{padding:3px 0;background:none;border:0;color:#5570d0;font-size:9px;font-weight:650}.text-action span{margin-left:3px}.more-button{color:#78859a;font-size:18px;line-height:12px}.activity-panel{min-height:275px}.activity-chart{height:167px;display:flex;margin-top:11px}.chart-y-labels{display:flex;flex-direction:column;justify-content:space-between;padding:4px 12px 18px 0;color:#abb3c0;font-size:8px}.chart-body{position:relative;flex:1}.chart-gridlines{position:absolute;inset:5px 0 22px;display:flex;flex-direction:column;justify-content:space-between}.chart-gridlines i{border-top:1px dashed #edf0f5}.bars{position:absolute;inset:5px 2px 0;display:grid;grid-template-columns:repeat(6,1fr);align-items:end}.bar-group{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;z-index:1}.bar-pair{height:calc(100% - 21px);display:flex;align-items:flex-end;gap:4px;width:42px;justify-content:center}.bar{width:13px;min-height:3px;border-radius:4px 4px 1px 1px}.primary-bar{background:linear-gradient(180deg,#7790f0,#4969dd)}.secondary-bar{background:#a9e3ce}.bar-group small{height:20px;padding-top:8px;color:#9ba5b4;font-size:8px}.chart-legend{display:flex;align-items:center;gap:16px;color:#8994a5;font-size:8px}.chart-legend span{display:flex;align-items:center;gap:5px}.legend-dot{width:7px;height:7px;border-radius:50%}.legend-dot.blue{background:#5574e2}.legend-dot.mint{background:#a9e3ce}.chart-period{margin-left:auto;color:#8f99a9!important}.events-panel{min-height:275px}.event-list{margin-top:11px}.event-row{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid #f0f2f6}.event-date{width:36px;height:39px;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:6px;background:#f0f3ff;color:#4b69d4}.event-date strong{font-size:14px;line-height:17px}.event-date span{font-size:8px;text-transform:uppercase;font-weight:700}.event-info{display:grid;gap:5px;flex:1}.event-info strong{font-size:9px;font-weight:650;color:#354158}.event-info span{font-size:8px;color:#9aa3b1}.event-arrow,.task-arrow{color:#a7afbc;font-size:20px}.all-events{width:100%;display:flex;justify-content:center;gap:7px;padding:12px 0 0;border:0;background:none;color:#5570d0;font-size:9px;font-weight:650}.bottom-grid{display:grid;grid-template-columns:minmax(0,1.56fr) minmax(290px,1fr);gap:15px}.members-panel{min-height:230px}.member-table{margin-top:18px}.table-head,.member-row{display:grid;grid-template-columns:1.65fr 1fr 1fr .75fr;align-items:center;gap:8px}.table-head{padding:0 0 9px;border-bottom:1px solid #edf0f4;color:#a0a9b7;font-size:7px;letter-spacing:.55px;font-weight:700}.member-row{min-height:42px;border-bottom:1px solid #f1f3f6;color:#677388;font-size:8px}.member-cell{display:flex;align-items:center;gap:7px;min-width:0}.member-cell strong{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#3a465b;font-size:8px;font-weight:650}.member-avatar{width:25px;height:25px;flex:none;display:grid;place-items:center;border-radius:50%;font-style:normal;font-size:8px;font-weight:700}.avatar-rose{background:#fbe8e8;color:#bd7777}.avatar-blue{background:#e6effc;color:#5a7bb0}.avatar-gold{background:#fbf0dc;color:#aa8748}.member-role,.member-date{color:#818c9e}.status-pill{display:inline-block;padding:4px 7px;border-radius:20px;background:#e8f7ef;color:#33a374;font-style:normal;font-size:7px;font-weight:650}.tasks-panel{min-height:230px}.task-count{padding:4px 7px;border-radius:12px;background:#f0f2f8;color:#77839a;font-size:8px}.task-row{width:100%;display:flex;align-items:flex-start;gap:9px;padding:12px 0;border:0;border-bottom:1px solid #f0f2f6;background:#fff;text-align:left;color:#465267;font-size:9px}.checkbox{width:13px;height:13px;display:grid;place-items:center;flex:none;margin-top:1px;border:1px solid #d6dce6;border-radius:4px;color:#fff;font-size:9px}.checkbox.checked{border-color:#4b6bdd;background:#4b6bdd}.task-row>span:nth-child(2){flex:1}.task-row small{display:block;margin-top:5px;color:#a0a9b7;font-size:8px}.task-arrow{font-size:17px;line-height:12px}.task-done{text-decoration:line-through;color:#9aa3b1}.task-action{padding-top:12px}.footer{display:flex;justify-content:space-between;padding:20px 1px 0;color:#a5adba;font-size:8px}.footer i{color:#e98080;font-style:normal}
    @media(max-width:1050px){.content{padding:25px 22px 14px}.topbar{padding:0 22px}.sidebar{width:225px}.main-area{margin-left:225px}.dashboard-grid,.bottom-grid{grid-template-columns:minmax(0,1.25fr) minmax(260px,1fr)}.stat-card{padding:13px}.stat-top{font-size:9px}}
    @media(max-width:760px){.sidebar{width:252px;transform:translateX(-102%);transition:transform .22s ease;box-shadow:none}.sidebar-open .sidebar{transform:translateX(0);box-shadow:8px 0 28px #17243a1c}.main-area{margin-left:0}.mobile-menu{display:grid;place-items:center;width:32px;height:32px;border:0;background:transparent;color:#53617a;font-size:18px}.topbar{height:57px;padding:0 15px;justify-content:flex-start;gap:10px}.breadcrumb{flex:1;font-size:10px;gap:7px}.topbar-actions{gap:9px}.today{display:none}.topbar-actions .icon-button:first-of-type{display:none}.content{padding:24px 15px 15px}.welcome-row{align-items:flex-start;gap:10px}.welcome-row h1{font-size:21px}.welcome-subtitle{max-width:290px;line-height:1.5}.primary-button{padding:9px 10px;font-size:9px;white-space:nowrap}.stats-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.stat-card{min-height:105px;padding:12px}.dashboard-grid,.bottom-grid{grid-template-columns:1fr;gap:10px}.activity-panel,.events-panel{min-height:unset}.activity-chart{height:160px}.members-panel,.tasks-panel{min-height:unset}.mobile-overlay{position:fixed;inset:0;z-index:4;border:0;background:#101a2b55}.footer{font-size:7px}.member-table{overflow-x:auto}.table-head,.member-row{min-width:450px}}
    @media(max-width:400px){.topbar-actions{gap:6px}.breadcrumb span:first-child{max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.welcome-row{flex-direction:column}.primary-button{align-self:flex-end;margin-top:-3px}.stat-top{font-size:8px}.stat-icon{width:25px;height:25px}}
  `]
})
export class AppComponent {
  currentRole: Role = 'ADMIN';
  activePage = 'Vue d’ensemble';
  roleMenuOpen = false;
  sidebarOpen = false;

  readonly roles: { value: Role; label: string }[] = [
    { value: 'SUPER_ADMIN', label: 'Super administrateur' }, { value: 'ADMIN', label: 'Administrateur' },
    { value: 'PRESIDENT', label: 'Président' }, { value: 'SECRETAIRE', label: 'Secrétaire' },
    { value: 'TRESORIER', label: 'Trésorier' }, { value: 'BUREAU_MEMBER', label: 'Membre du bureau' },
    { value: 'MEMBER', label: 'Membre' }, { value: 'USER', label: 'Utilisateur' }
  ];

  readonly navigation: NavItem[] = [
    { label: 'Vue d’ensemble', icon: '⌂', roles: ['SUPER_ADMIN','ADMIN','PRESIDENT','SECRETAIRE','TRESORIER','BUREAU_MEMBER','MEMBER','USER'] },
    { label: 'Membres', icon: '♙', roles: ['SUPER_ADMIN','ADMIN','PRESIDENT','SECRETAIRE'] },
    { label: 'Bureau & gouvernance', icon: '♧', roles: ['SUPER_ADMIN','ADMIN','PRESIDENT','BUREAU_MEMBER'] },
    { label: 'Cotisations', icon: '€', roles: ['SUPER_ADMIN','ADMIN','TRESORIER'] },
    { label: 'Finances', icon: '▤', roles: ['SUPER_ADMIN','ADMIN','TRESORIER'] },
    { label: 'Réunions', icon: '▦', roles: ['SUPER_ADMIN','ADMIN','PRESIDENT','SECRETAIRE','BUREAU_MEMBER','MEMBER'] },
    { label: 'Événements', icon: '◷', roles: ['SUPER_ADMIN','ADMIN','PRESIDENT','SECRETAIRE','BUREAU_MEMBER','MEMBER','USER'] },
    { label: 'Documents', icon: '▧', roles: ['SUPER_ADMIN','ADMIN','PRESIDENT','SECRETAIRE','TRESORIER','BUREAU_MEMBER','MEMBER'] },
    { label: 'Annonces', icon: '◉', roles: ['SUPER_ADMIN','ADMIN','PRESIDENT','SECRETAIRE','BUREAU_MEMBER'] },
    { label: 'Messages', icon: '✉', roles: ['SUPER_ADMIN','ADMIN','PRESIDENT','SECRETAIRE','TRESORIER','BUREAU_MEMBER','MEMBER'] },
    { label: 'Paramètres', icon: '⚙', roles: ['SUPER_ADMIN','ADMIN'] }
  ];

  readonly chartBars = [
    { month: 'Juin', members: 45, activities: 28 }, { month: 'Juil.', members: 61, activities: 42 },
    { month: 'Août', members: 52, activities: 34 }, { month: 'Sept.', members: 77, activities: 51 },
    { month: 'Oct.', members: 67, activities: 39 }, { month: 'Nov.', members: 89, activities: 58 }
  ];
  readonly events = [
    { day: '22', month: 'NOV', title: 'Assemblée générale', time: '10:00', place: 'Salle des fêtes' },
    { day: '26', month: 'NOV', title: 'Atelier solidaire', time: '14:30', place: 'Centre associatif' },
    { day: '02', month: 'DÉC', title: 'Réunion du bureau', time: '18:00', place: 'En visioconférence' }
  ];
  readonly members = [
    { initials: 'AM', name: 'Aïssatou Mbaye', role: 'Bénévole', date: '18 nov. 2026', color: 'avatar-rose' },
    { initials: 'JD', name: 'Jean Diop', role: 'Membre', date: '17 nov. 2026', color: 'avatar-blue' },
    { initials: 'FN', name: 'Fatou Ndiaye', role: 'Trésorière', date: '15 nov. 2026', color: 'avatar-gold' }
  ];
  tasks = [
    { title: 'Valider le compte-rendu de réunion', due: 'Échéance : 20 nov. 2026', done: false },
    { title: 'Préparer les documents de l’assemblée', due: 'Échéance : 22 nov. 2026', done: false },
    { title: 'Confirmer la réservation de salle', due: 'Terminé', done: true }
  ];

  get visibleNavigation(): NavItem[] { return this.navigation.filter(item => item.roles.includes(this.currentRole)); }
  get roleLabel(): string { return this.roles.find(role => role.value === this.currentRole)?.label ?? 'Membre'; }
  get userName(): string { return this.currentRole === 'SUPER_ADMIN' ? 'M. Diallo' : 'Aminata Sow'; }
  get initials(): string { return this.currentRole === 'SUPER_ADMIN' ? 'MD' : 'AS'; }
  get greeting(): string { return `Bonjour ${this.userName.split(' ')[0]} 👋`; }
  get pageDescription(): string { return `Retrouvez les informations et les actions de votre espace ${this.roleLabel.toLowerCase()}.`; }
  get primaryAction(): string {
    if (this.currentRole === 'TRESORIER') return 'Nouvelle cotisation';
    if (this.currentRole === 'MEMBER' || this.currentRole === 'USER') return 'Voir les événements';
    if (this.currentRole === 'SECRETAIRE') return 'Créer une annonce';
    return 'Nouvelle activité';
  }
  get primaryActionTarget(): string {
    if (this.currentRole === 'TRESORIER') return 'Cotisations';
    if (this.currentRole === 'MEMBER' || this.currentRole === 'USER') return 'Événements';
    if (this.currentRole === 'SECRETAIRE') return 'Annonces';
    return 'Activités';
  }
  get stats(): { label: string; value: string; change: string; period: string; icon: string; color: string }[] {
    const common = [
      { label: 'Membres actifs', value: '248', change: '+12,8%', period: 'vs. mois dernier', icon: '♙', color: 'icon-blue' },
      { label: 'Événements à venir', value: '08', change: '+2', period: 'ce mois-ci', icon: '◷', color: 'icon-green' }
    ];
    if (this.currentRole === 'TRESORIER') return [
      { label: 'Cotisations reçues', value: '1 840 €', change: '+8,2%', period: 'vs. mois dernier', icon: '€', color: 'icon-green' },
      { label: 'En attente', value: '320 €', change: '12 membres', period: 'à relancer', icon: '◷', color: 'icon-orange' },
      { label: 'Dépenses du mois', value: '640 €', change: '−3,1%', period: 'vs. mois dernier', icon: '▤', color: 'icon-purple' },
      { label: 'Solde disponible', value: '8 250 €', change: '+5,4%', period: 'ce mois-ci', icon: '↗', color: 'icon-blue' }
    ];
    if (this.currentRole === 'MEMBER' || this.currentRole === 'USER') return [common[0], common[1],
      { label: 'Mes participations', value: '05', change: '+1', period: 'ce mois-ci', icon: '✓', color: 'icon-orange' },
      { label: 'Documents partagés', value: '24', change: '+3', period: 'récemment ajoutés', icon: '▧', color: 'icon-purple' }
    ];
    return [...common,
      { label: 'Cotisations collectées', value: '8 420 €', change: '+8,2%', period: 'vs. mois dernier', icon: '€', color: 'icon-orange' },
      { label: 'Taux de participation', value: '76,4%', change: '+4,3%', period: 'vs. mois dernier', icon: '↗', color: 'icon-purple' }
    ];
  }

  selectRole(role: Role): void {
    this.currentRole = role;
    this.roleMenuOpen = false;
    if (!this.visibleNavigation.some(item => item.label === this.activePage)) this.activePage = 'Vue d’ensemble';
  }

  selectPage(page: string): void {
    this.activePage = page;
    this.sidebarOpen = false;
  }
}
