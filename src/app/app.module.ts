import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
// Auth0
import { JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './shared/services/auth/auth.service';
import { ConfigService } from './shared/services/config/config.service';
import { ResponseInterceptor } from './shared/services/auth/response.interceptor';

import { AppComponent } from './app.component';

import { LoginComponent } from './auth/login/login.component';

import { HelpComponent } from './help/help.component';
import { ContentBoxComponent } from './_layout/content-box/content-box.component';

import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import {TabsModule} from "ngx-bootstrap/tabs";
import {TimeagoModule} from "ngx-timeago";
import {NgxSpinnerModule} from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from "ngx-toastr";

import { ListComponent } from './lists/list/list.component';
import {TaskListComponent} from "./lists/list/task-list/task-list.component";
import {NoteListComponent} from "./lists/list/note-list/note-list.component";
import {CheckListComponent} from "./lists/list/check-list/check-list.component";

import {ListIndexComponent} from "./lists/list-index/list-index.component";
import { ListIndexItemComponent } from './lists/list-index-item/list-index-item.component';
import { ListItemComponent } from './lists/list-item/list-item.component';
import { TodayComponent } from './today/today.component';
import { ThisWeekComponent } from './this-week/this-week.component';
import { ListCreateComponent } from './lists/list-create/list-create.component';



export function initApp(http: HttpClient) {
  return () => {
    return http
      .get('https://api.ipify.org/?format=json')
      .toPromise()
      .then((resp) => {
        if (resp) {
          // @ts-ignore
          const ip = resp['ip'];
        }
      });
  };
}


export function tokenGetter() {

  return sessionStorage.getItem('token');
}



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppLayoutComponent,
    SettingsComponent,
    DashboardComponent,
    HelpComponent,
    ContentBoxComponent,
    TaskListComponent,
    CheckListComponent,
    ListComponent,
    ListIndexComponent,

    NoteListComponent,
     ListIndexItemComponent,
     ListItemComponent,
     TodayComponent,
     ThisWeekComponent,
     ListCreateComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    TimeagoModule.forRoot(),
    JwtModule.forRoot({
      config: {
        allowedDomains: ["localhost:8000","127.0.0.1:8000"],
        disallowedRoutes: [],
        tokenGetter: tokenGetter
      }}),
      BrowserAnimationsModule,
      NgxSpinnerModule,
    ToastrModule.forRoot(), // ToastrModule added
      NgbModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [HttpClient],
      multi: true,
    },
    AuthService,
    ConfigService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
