
import { SettingsComponent } from './settings/settings.component';
import { NgModule} from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from "./auth/login/login.component";

import {AppLayoutComponent} from "./_layout/app-layout/app-layout.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HelpComponent} from "./help/help.component";



const routes: Routes = [
  // App routes goes here here
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
/*
      { path: 'scores', component: ScoresIndexComponent },

      {
        path: 'scores/:entityId/:id',
        component: ScoresDetailsComponent,

      },
  */
      {
        path: 'settings',
        component: SettingsComponent,
      },
      { path: 'help', component: HelpComponent },
    ],
  },

  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
