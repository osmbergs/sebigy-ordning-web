import { Component, OnInit } from '@angular/core';


import {Observable} from "rxjs/index";
import {ConfigService} from "../shared/services/config/config.service";
import {animate, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';

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

  constructor(private config:ConfigService, public router:Router) {


    this.environment=this.config.getEnvironment();

  }
  ngOnInit(): void {


  }

}
