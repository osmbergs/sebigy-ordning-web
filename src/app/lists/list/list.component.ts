import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ListModel} from "../../shared/services/list/list.model";
import {ListService} from "../../shared/services/list/list.service";
import {ItemService} from "../../shared/services/list/item.service";
import {PaginatedItemsModel} from "../../shared/services/list/paginated.items.model";
import {ItemModel} from "../../shared/services/list/item.model";

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
    private itemService:ItemService

  ) { }


  public list: ListModel | undefined
  public items: ItemModel[] | undefined
  private sub: any;
private id:any

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.id = params['list_id'];

      console.log("Loading list ",params['list_id'])

      this.itemService.loadItemsForlist(this.id).subscribe(i=> {
        this.items=i;
        this.listService.loadList(this.id).subscribe(l=>{
          this.list=l;

        })
      })

    });

  }

}
