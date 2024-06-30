import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CreateAccount } from './components/create-account/create-account.component';

export const routes: Routes = [
    {path: '', component: HomeComponent },
    {path: 'login', component: LoginComponent },
    {path: 'create-account', component: CreateAccount },
    {path: '**', redirectTo: '' },
];
