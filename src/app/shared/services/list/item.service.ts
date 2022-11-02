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

export class ItemService {
  constructor(
    private http: HttpClient,
    private cfg: ConfigService,
    private auth: AuthService
  )
  {

  }



 // private _currentItems:BehaviorSubject<ItemModel[]>=new BehaviorSubject<any>([])
 // public readonly currentItems:Observable<ItemModel[]> = this._currentList.asObservable();



//  private _scores: BehaviorSubject<any[]> = new BehaviorSubject([]);
//  private _dashboardScores: BehaviorSubject<any[]> = new BehaviorSubject([]);
//  private _priceCreateScores: BehaviorSubject<any[]> = new BehaviorSubject([]);
//  private _errorInfo: BehaviorSubject<any[]> = new BehaviorSubject([]);

//  private _lastGenerated: BehaviorSubject<ScoreModel> = new BehaviorSubject(
//    null
//  );

//  public readonly scores$: Observable<any[]> = this._scores.asObservable();

//  public readonly dashBoardScores: Observable<any[]> =
//    this._dashboardScores.asObservable();
//  public readonly priceCreateScores: Observable<any[]> =
//    this._priceCreateScores.asObservable();

//  public readonly errorInfo: Observable<any[]> = this._errorInfo.asObservable();

//  private _hasCalc: boolean = false;

  //////////////////////////////////////////////////////
  public loadItemsForlist(listId: string) {

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };


    return this.http.get<ItemModel[]>(this.cfg.getEnvironment().apiURL + '/api/v1/item-lists/'+listId+'/items'  , httpOptions);
  }




  }



