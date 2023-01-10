import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { AuthService } from '../auth/auth.service';
import {BehaviorSubject, map, Observable, Subject, Subscription} from "rxjs";
import {ListModel} from "./list.model";
import {ItemModel} from "./item.model";
import {PaginatedListModel} from "./paginated.list.model";
import {PaginatedItemsModel} from "./paginated.items.model";



@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(
    private http: HttpClient,
    private cfg: ConfigService,

    private auth: AuthService
  )
  {

  }


  private _lists:BehaviorSubject<any>=new BehaviorSubject<any>({})
  public readonly lists:Observable<any> = this._lists.asObservable();

  private _currentList:BehaviorSubject<any>=new BehaviorSubject<any>({})
  public readonly currentList:Observable<any> = this._currentList.asObservable();



  private _currentItems:BehaviorSubject<ItemModel[]>=new BehaviorSubject<any>([])
  public readonly currentItems:Observable<ItemModel[]> = this._currentItems.asObservable();



  //////////////////////////////////////////////////////
  public loadList(id: string) {
    console.log("setList", id)

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };


    return this.http.get<ListModel>(this.cfg.getEnvironment().apiURL + '/api/v1/item-lists/' + id + '/', httpOptions);
  }


  //////////////////////////////////////////////////////
  public addList(name:string, description:string,type:string) {

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    const body={
      name:name,
      description:description,
      type:type

    }

    return this.http.post<ListModel>(this.cfg.getEnvironment().apiURL + '/api/v1/item-lists/'  , body,httpOptions);
  }



  public setCurrentList(listId:string){
    console.log("ListService:setCurrentList",listId)
    for(var i=0;i<this._lists.value.length;i++)
    {

      if(this._lists.value[i].id==listId) {
        console.log("wtf")
        this._currentList.next(this._lists.value[i])
        this.refreshCurrentItems(this._lists.value[i].id);
        break;
      }


    }


  }



    public refreshLists() {

      const httpOptions = {
        headers: new HttpHeaders({
          Accept: 'application/json',
        }),
      };


      return this.http.get<PaginatedListModel>(this.cfg.getEnvironment().apiURL + '/api/v1/item-lists/', httpOptions).subscribe( ret=>{
        console.log("ListService:refreshLists",ret)
        this._lists.next(ret.items);
        this.setCurrentList(ret.items[0].id);


      },error => {


        console.error("Failed loading lists...")

      });





  }









  //////////////////////////////////////////////////////
  public refreshCurrentItems(listId:string) {
    console.log("ListService:refreshCurrentItems, start")
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    this.http.get<PaginatedItemsModel>(this.cfg.getEnvironment().apiURL + '/api/v1/item-lists/'+listId+'/items'  , httpOptions).subscribe(
      ret=>{
        console.log("ListService:refreshCurrentItems",ret)
        this._currentItems.next(ret.items);
      },
      error => {

        console.error("Failed loading items",error)
      }

    );




  }


  //////////////////////////////////////////////////////
  public addItem(listId: string, name:string, description:string) {

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    const body={
      name:name,
      description:description,
      list_id:listId

    }

    return this.http.post<ItemModel>(this.cfg.getEnvironment().apiURL + '/api/v1/list-items/'  , body,httpOptions);
  }


  //////////////////////////////////////////////////////
  public deleteItem(id: string): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.delete<ItemModel[]>(
      this.cfg.getEnvironment().apiURL + '/api/v1/list-items/' + id,
      httpOptions
    );
  }


  public connect(): void {
    let source = new EventSource(this.cfg.getEnvironment().apiURL + '/api/v1/events/?tok='+this.auth.getToken());
    source.addEventListener('userid', message => {

      console.log("Got message",message);


    });
  }










}



