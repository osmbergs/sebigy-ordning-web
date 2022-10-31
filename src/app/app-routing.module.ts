
import { SettingsComponent } from './settings/settings.component';
import { NgModule} from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from "./auth/login/login.component";

import {AppLayoutComponent} from "./_layout/app-layout/app-layout.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HelpComponent} from "./help/help.component";
import {ListComponent} from "./lists/list/list.component";



const routes: Routes = [
  // App routes goes here here
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },

      { path: 'list/:listId', component: ListComponent },
//      { path: 'list/:listId/item/:itemId', component: ItemComponent },

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
