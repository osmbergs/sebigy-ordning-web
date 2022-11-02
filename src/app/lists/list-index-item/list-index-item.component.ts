import {Component, Input, OnInit} from '@angular/core';
import {ListModel} from "../../shared/services/list/list.model";

@Component({
  selector: 'list-index-item',
  templateUrl: './list-index-item.component.html',
  styleUrls: ['./list-index-item.component.scss']
})
export class ListIndexItemComponent implements OnInit {

  constructor() { }

  @Input() list:ListModel|undefined;

  ngOnInit(): void {
  }

}
