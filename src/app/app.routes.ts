import { Routes } from '@angular/router';
import { ConfigFormComponent } from './modules/config/pages/config-form/config-form.component';
import { PresenceCheckComponent } from './modules/presence/pages/presence-check/presence-check.component';
import { EvaluationFormComponent } from './modules/evaluation/pages/evaluation-form/evaluation-form.component';
import { ConsultationStartComponent } from './modules/consultation/pages/consultation-start/consultation-start.component';
import { HistoryPageComponent } from './modules/history/pages/history-page/history-page.component';
import { MediumFormComponent } from './modules/mediums/pages/medium-form/medium-form.component';

export const routes: Routes = [
    { path: '', redirectTo: 'config', pathMatch: 'full' },
    { path: 'config', component: ConfigFormComponent },
    { path: 'presence', component: PresenceCheckComponent },
    { path: 'evaluation', component: EvaluationFormComponent },
    { path: 'consultation', component: ConsultationStartComponent},
    { path: 'history', component: HistoryPageComponent },
    { path: 'mediums', component: MediumFormComponent },
];
