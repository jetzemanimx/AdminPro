import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs.component';

//Rutas de Perfil
import { ProfileComponent } from './profile/profile.component';

import { LoginGuard } from '../services/service.index';

//Rutas Mantenimiento
import { UsuariosComponent } from './usuarios/usuarios.component';

const pagesRoutes: Routes = [
    { 
        path: '', 
        component: PagesComponent,
        canActivate : [LoginGuard],
        children : [
            { path: 'dashboard', component: DashboardComponent, data : { titulo : "Dashboard", descripcion : "Este es el dashboard"} },
            { path: 'progress', component: ProgressComponent, data : { titulo : "Barras Progreso"}},
            { path: 'graficas1', component: Graficas1Component, data : { titulo : "Graficas"} },
            { path: 'promesas', component: PromesasComponent, data : { titulo : "Promesas"} },
            { path: 'rxjs', component: RxjsComponent, data : { titulo : "RXJS"} },
            { path: 'account-settings', component: AccountSettingsComponent, data : { titulo : "Confiuración de Cuenta"} },
            { path: 'profile', component: ProfileComponent, data : { titulo : "Perfil de Usuario"} },
            //Mantenimientos
            { path: 'usuarios', component: UsuariosComponent, data : { titulo : "Mantenimiento de Usuario"} },
            { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);