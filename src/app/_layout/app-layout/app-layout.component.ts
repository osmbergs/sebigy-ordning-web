import { Component, OnInit } from '@angular/core';

import { UserModel } from './../../shared/services/user/user.model';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../shared/services/config/config.service';



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

  ) {
    if (!authService.isAuthenticated()) {
      this.router.navigate(['login']);
    }

    this.environment = this.config.getEnvironment();
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
    } else {
      this.loggedInUser = this.authService.getLoggedInUser() as UserModel;

      if (this.loggedInUser?.is_admin) {
        this.adminUser = true;
      }
    }


  }

  logout(): void {
    this.router.navigate(['login']);
  }
}
