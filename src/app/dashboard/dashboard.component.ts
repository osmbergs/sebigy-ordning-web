import { Component, OnInit } from '@angular/core';


import {Observable} from "rxjs/index";
import {ConfigService} from "../shared/services/config/config.service";
import {animate, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import {ListService} from "../shared/services/list/list.service";
import {ListModel} from "../shared/services/list/list.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({  opacity: 0 }),
        animate('1s ease-out', style({  opacity: 1 })),
      ]),
      transition(':leave', [
        style({  opacity: 1 }),
        animate('1s ease-in', style({  opacity: 0 })),
      ]),
    ]),
  ],
})
export class DashboardComponent implements OnInit {


  public environment:any;
  public lists: ListModel[] | undefined


  constructor(private config:ConfigService, public router:Router, public listService:ListService) {

    this.environment=this.config.getEnvironment();

  }
  ngOnInit(): void {
    this.listService.lists.subscribe(lists=>{
      this.lists=lists
    })

  }

}
