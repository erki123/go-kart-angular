import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CreateAccount } from './components/create-account/create-account.component';
import { RacesComponent } from './components/races/races.component';
import { EShopComponent } from './components/e-shop/e-shop.component';
import { AdminTabComponent } from './components/admin-tab/admin-tab.component';

export const routes: Routes = [
    {path: '', component: HomeComponent },
    {path: 'login', component: LoginComponent },
    {path: 'races', component: RacesComponent },
    {path: 'e-shop', component: EShopComponent },
    {path: 'create-account', component: CreateAccount },
    {path: 'admin-tab', component: AdminTabComponent },
    {path: '**', redirectTo: '' },
];
