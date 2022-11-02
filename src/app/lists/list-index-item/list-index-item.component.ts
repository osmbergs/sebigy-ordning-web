import {Component, Input, OnInit} from '@angular/core';
import {ListModel} from "../../shared/services/list/list.model";
import {Router} from "@angular/router";

@Component({
  selector: 'list-index-item',
  templateUrl: './list-index-item.component.html',
  styleUrls: ['./list-index-item.component.scss']
})
export class ListIndexItemComponent implements OnInit {

  constructor(
    private router: Router,

  ) {}

  @Input() list:ListModel|undefined;

  ngOnInit(): void {
  }

  onClick() {
//      this.router.navigate([
    //      `/scores/${this.score.entity_id}/${this.score.id}`,
    //  ]);


    this.router.navigateByUrl('/lists/' + this.list?.id);


  }

}
