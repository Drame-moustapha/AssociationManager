import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { roleGuard } from './core/guards/role.guard';
import { LoginComponent } from './features/auth/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MembersComponent } from './features/members/members.component';
import { AssociationsComponent } from './features/associations/associations.component';
import { WorkspaceLayoutComponent } from './layouts/workspace-layout.component';
import { FeatureComponent } from './features/feature.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  { path: '', component: WorkspaceLayoutComponent, canActivate: [authGuard], children: [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'associations', component: AssociationsComponent, canActivate: [roleGuard], data: { roles: ['ADMIN'] } },
    { path: 'members', component: MembersComponent },
    { path: 'activities', component: FeatureComponent, data: { title: 'Activités', description: 'Planifiez et suivez les activités de votre association.' } },
    { path: 'meetings', component: FeatureComponent, data: { title: 'Réunions', description: 'Consultez les réunions et leurs ordres du jour.' } },
    { path: 'finance', component: FeatureComponent, data: { title: 'Finances', description: 'Suivez les cotisations et les campagnes de collecte.' } },
    { path: 'governance', component: FeatureComponent, data: { title: 'Bureau & gouvernance', description: 'Consultez les bureaux et les mandats de votre association.' } },
    { path: 'documents', component: FeatureComponent, data: { title: 'Documents', description: 'Retrouvez les documents de votre association.' } },
    { path: 'profile', component: FeatureComponent, data: { title: 'Mon profil', description: 'Informations de votre compte.' } }
  ]},
  { path: '**', redirectTo: '' }
];
