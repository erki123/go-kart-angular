import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RaceComponent } from './components/race/race.component';
import { AdminTabComponent } from './components/admin-tab/admin-tab.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'race', component: RaceComponent},
    { path: 'admin-tab', component: AdminTabComponent},
    { path: '**', redirectTo: '' },
];

