
import { SettingsComponent } from './settings/settings.component';
import {Component, NgModule} from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from "./auth/login/login.component";

import {AppLayoutComponent} from "./_layout/app-layout/app-layout.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HelpComponent} from "./help/help.component";
import {ListComponent} from "./lists/list/list.component";

import {ListIndexComponent} from "./lists/list-index/list-index.component";
import {TodayComponent} from "./today/today.component";
import {ThisWeekComponent} from "./this-week/this-week.component";



const routes: Routes = [
  // App routes goes here here
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },

      { path: 'lists/:list-id', component: ListComponent },
//      { path: 'list/:listId/item/:itemId', component: ItemComponent },

      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'today',
        component: TodayComponent,
      },
      {
        path: 'this-week',
        component: ThisWeekComponent,
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
