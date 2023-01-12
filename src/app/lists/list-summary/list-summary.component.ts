import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ListModel} from "../../shared/services/list/list.model";
import {ListService} from "../../shared/services/list/list.service";

import {PaginatedItemsModel} from "../../shared/services/list/paginated.items.model";
import {ItemModel} from "../../shared/services/list/item.model";
import {Observable} from "rxjs";

@Component({
  selector: 'list-summary',
  templateUrl: 'list-summary.component.html',
  styleUrls: ['list-summary.component.scss']
})
export class ListSummaryComponent implements OnInit {

  constructor(

    private listService:ListService,

  ) {

  }


  @Input() list: ListModel | undefined;



  private sub: any;

  public newItemName:string=""

  private listId:any

  ngOnInit(): void {







  }



}
