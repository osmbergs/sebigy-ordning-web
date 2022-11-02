import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ListModel} from "../../shared/services/list/list.model";
import {ListService} from "../../shared/services/list/list.service";
import {PaginatedListModel} from "../../shared/services/list/paginated.list.model";

@Component({
  selector: 'list-index',
  templateUrl: './list-index.component.html',
  styleUrls: ['./list-index.component.css']
})
export class ListIndexComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listService:ListService

  ) { }


  public lists: PaginatedListModel | undefined

  private sub: any;
private id:any

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number


      this.listService.loadLists().subscribe(ls=> {
        this.lists=ls;
      })

    });

  }

}
