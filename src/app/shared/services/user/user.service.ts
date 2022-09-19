
import {AuthService} from "../auth/auth.service";
import {ConfigService} from "../config/config.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CreateUserModel, UserModel} from "./user.model";
import { SearchParamModel } from "./searchParam.model";
import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {



  // @ts-ignore
  private _users: BehaviorSubject<any[]> = new BehaviorSubject([]);

  public readonly users: Observable<any[]> = this._users.asObservable();

  constructor(private http: HttpClient, private  cfg: ConfigService, private auth: AuthService) {

  }

  //public currSearchParams:SearchParamModel=null;

  public loadUsers(param?: SearchParamModel)
  {

    let url = this.cfg.getEnvironment().apiURL+'/api/v1/admin/users/';

    if(param) {
      let qs = "?p_n=" + param.limit;
      qs+= "&p_p=" + param.page;

      if(param.q_email) {
        qs+= "&q_email=" + param.q_email;
      }
      if(param.q_first_name) {
        qs+= "&q_first_name=" + param.q_first_name;
      }
      if(param.q_last_name) {
        qs+= "&q_last_name=" + param.q_last_name;
      }
      if(param.q_user_id) {
        qs+= "&q_user_id=" + param.q_user_id;
      }


      url = url + qs;

    }

    const httpOptions = {

      headers: new HttpHeaders({
        'Accept':  'application/json'
      })}

    return this.http.get<UserModel[]>(url,  httpOptions).pipe(

      map( e => {
        e.map( s=>
        {

        })
        return e
      })
    ).subscribe(
      data=>{

        var users = this._users.getValue();
        users=data;
        console.log("got users ",users)
        this._users.next(users);

      }
    );


  }

  //////////////////////////////////////////////////////
  public loadUser(id:number):Observable<UserModel>
  {

    const httpOptions = {

      headers: new HttpHeaders({
        'Accept':  'application/json'

      })}

    return this.http.get<UserModel>(this.cfg.getEnvironment().apiURL+'/api/v1/admin/users/'+id,   httpOptions).pipe(

      map( s => {




          return s;

        }
      )
    )



  }

  public createUser(user: CreateUserModel)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post<UserModel>(this.cfg.getEnvironment().apiURL+'/api/v1/admin/users/',  user, httpOptions).pipe(
      map(s => s)
    )
  }

  public updateUser(user: any)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.put<UserModel>(this.cfg.getEnvironment().apiURL+'/api/v1/admin/users/'+user.id, user, httpOptions).pipe(
      map(s => s)
    )
  }

  public deleteUser(userId: string)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.delete<UserModel>(this.cfg.getEnvironment().apiURL+'/api/v1/admin/users/'+userId,  httpOptions).pipe(
      map(s => s)
    )
  }

}
