import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import {AuthService} from "../../shared/services/auth/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {NgxSpinnerService} from "ngx-spinner";
import {UserService} from "../../shared/services/user/user.service";
import {ConfigService} from "../../shared/services/config/config.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  public environment:any;

  loginForm: FormGroup ;

  invalidLogin: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService,private spinner: NgxSpinnerService, private usersService:UserService,private config:ConfigService) {

    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
      testuser: ['']
    });


    this.environment=this.config.getEnvironment();
  }

  onSubmit() {
    this.spinner.show();
    // @ts-ignore
    if (this.loginForm.invalid) {
      return;
    }

    const loginPayload = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value
    }



    if(this.loginForm.controls['testuser'].value)
    {
      const parts=this.loginForm.controls['testuser'].value.split(';')
      loginPayload.username=parts[0]
      loginPayload.password=parts[1]
      console.log("Using select to log in..",loginPayload)

    }








    // @ts-ignore
    this.authService.login(loginPayload.username,loginPayload.password).subscribe(
      data => {
        console.log("Got auth data",data)
        this.spinner.hide();
        if(data.status === 200) {
          sessionStorage.setItem('token', data.body["access_token"]);

          var tokUser=this.authService.getDecodedToken();



          /**
           this.usersService.loadUser(tokUser.userId).subscribe(data=>
           {

          console.log("Setting logged in user to ",data)
          this.authService.loggedInUser= data;


        })
           */

          //       this.authService.loggedInUser= this.authService.getDecodedToken();






          this.router.navigate(['']);
        }else {
          this.invalidLogin = true;
        }
      },
      err=>{
        this.spinner.hide();
        this.invalidLogin = true;
      }


    );

  }

  ngOnInit() {

    sessionStorage.removeItem('token');




  }





}
