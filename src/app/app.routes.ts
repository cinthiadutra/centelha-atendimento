import { Routes } from '@angular/router';
import { ConfigFormComponent } from './modules/config/pages/config-form/config-form.component';
import { PresenceCheckComponent } from './modules/presence/pages/presence-check/presence-check.component';
import { EvaluationFormComponent } from './modules/evaluation/pages/evaluation-form/evaluation-form.component';
import { ConsultationStartComponent } from './modules/consultation/pages/consultation-start/consultation-start.component';
import { HistoryPageComponent } from './modules/history/pages/history-page/history-page.component';
import { MediumFormComponent } from './modules/mediums/pages/medium-form/medium-form.component';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { AdminDashboardComponent } from './modules/admin/pages/admin-dashboard/admin-dashboard.component';
import { authGuard } from './core/services/auth.guard';
import { RegisterComponent } from './modules/auth/pages/register/register.component';
import { adminGuard } from './core/services/admin.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: ConfigFormComponent },
    { path: 'presence', component: PresenceCheckComponent },
    { path: 'evaluation', component: EvaluationFormComponent },
    { path: 'consultation', component: ConsultationStartComponent },
    { path: 'history', component: HistoryPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminDashboardComponent, canActivate: [adminGuard] },
    { path: 'mediums', component: MediumFormComponent, canActivate: [adminGuard] },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }

];
