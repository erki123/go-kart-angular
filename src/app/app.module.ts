import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RacesComponent } from './components/races/races.component';
import { EShopComponent } from './components/e-shop/e-shop.component';

const routes: Routes = [
    {path: '', component: HomeComponent },
    {path: 'login', component: LoginComponent },
    {path: 'races', component: RacesComponent },
    {path: 'e-shop', component: EShopComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RacesComponent,
    EShopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }