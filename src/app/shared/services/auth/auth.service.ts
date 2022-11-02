

import {ConfigService} from "../config/config.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";


@Injectable()
export class AuthService {

 constructor(private http:HttpClient, private  cfg:ConfigService)
 {}

  //public loggedInUser:UserModel;
public loggedInUser:any;


 public getLoggedInUser():any
 {
  var ret=this.getDecodedToken();
  console.log("Got logged in user",ret)

   return ret
 }

  public getToken(): string {
    return <string>sessionStorage.getItem('token');
  }

  public getDecodedToken() {

    const helper = new JwtHelperService();

    let decodedToken: any;
    // @ts-ignore
    decodedToken = helper.decodeToken(sessionStorage.getItem('token'));

    return decodedToken;
  }

  public login(username:string, password:string):Observable<any>
  {

    let body = new URLSearchParams();
      body.set('username', username);
      body.set('password', password);


    const httpOptions = {
      observe: 'response' as 'body',
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'

      })}

    return this.http.post(this.cfg.getEnvironment().apiURL+'/public/auth/login', body.toString(), httpOptions)
    .pipe(catchError(err => {
      return throwError(err);
    }));

  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    if (token==null)
      return false;

    // return a boolean reflecting
    // whether or not the token is expired
    //return tokenNo(null, token);
    return true;
  }
}
