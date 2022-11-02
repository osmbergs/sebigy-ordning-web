import {Component, Input, OnInit} from '@angular/core';

import {Router} from "@angular/router";
import {ItemModel} from "../../shared/services/list/item.model";

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  constructor(
    private router: Router,

  ) {}

  @Input() item:ItemModel|undefined;

  ngOnInit(): void {
  }

  onClick() {
//      this.router.navigate([
    //      `/scores/${this.score.entity_id}/${this.score.id}`,
    //  ]);


//    this.router.navigateByUrl('/lists/' + this.list?.id);


  }

}
