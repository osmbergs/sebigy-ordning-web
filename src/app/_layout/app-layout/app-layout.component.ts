import { Component, OnInit } from '@angular/core';

import { UserModel } from './../../shared/services/user/user.model';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../shared/services/config/config.service';
import {ListService} from "../../shared/services/list/list.service";
import {ListModel} from "../../shared/services/list/list.model";



@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent implements OnInit {
  public loggedInUser: any = {};

  public environment: any;

  public adminUser: boolean = false;

  public tenant: any = {};
  constructor(
    private authService: AuthService,
    private router: Router,
    private config: ConfigService,
    private listService:ListService,


  ) {
    if (!authService.isAuthenticated()) {
      this.router.navigate(['login']);
    }

    this.environment = this.config.getEnvironment();
  }

  public lists: ListModel[] | undefined


  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
    } else {
      this.loggedInUser = this.authService.getLoggedInUser() as UserModel;

      if (this.loggedInUser?.is_admin) {
        this.adminUser = true;
      }
    }


    this.listService.refreshLists();
    this.listService.lists.subscribe(lists=>{
      this.lists=lists
    })



  }

  logout(): void {
    this.router.navigate(['login']);
  }
}
