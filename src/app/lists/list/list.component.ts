import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ListModel} from "../../shared/services/list/list.model";
import {ListService} from "../../shared/services/list/list.service";

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listService:ListService

  ) { }


  public list: ListModel | undefined

  private sub: any;
private id:any

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number


      this.listService.loadList(this.id).subscribe(l=> {
        this.list=l;
      })

    });

  }

}
