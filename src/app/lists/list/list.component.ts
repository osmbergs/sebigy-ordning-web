import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ListModel} from "../../shared/services/list/list.model";
import {ListService} from "../../shared/services/list/list.service";

import {PaginatedItemsModel} from "../../shared/services/list/paginated.items.model";
import {ItemModel} from "../../shared/services/list/item.model";
import {Observable} from "rxjs";

@Component({
  selector: 'list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css']
})
export class ListComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listService:ListService,

  ) {

  }


  public list: ListModel|undefined;
  public items: ItemModel[]|undefined;
  private sub: any;

  public newItemName:string=""

private listId:any

  ngOnInit(): void {

    this.sub = this.route.params.subscribe((params) => {

      this.listId= params['list-id'];
      this.listService.setCurrentList(this.listId)
    });

    this.listService.currentList.subscribe(list =>{
        this.list=list;
        this.listService.currentItems.subscribe(items=>{
          this.items=items;
        })

    }

    )



  }

  addNew(event: any) {


    console.log("You entered: ", this.newItemName);

    if(this.list)
      this.listService.addItem(this.list.id,this.newItemName,"").subscribe(ret=>{
        this.listService.refreshCurrentItems(this.listId)
        this.newItemName="";

      },err=>{

        console.log("Failed adding new item",err)
      })

  }

}
