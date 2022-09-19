import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'content-box',
  templateUrl: './content-box.component.html',
  styleUrls: ['./content-box.component.scss']
})
export class ContentBoxComponent implements OnInit {
@Input() minHeight: string | undefined;
@Input() paddingTop: string | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
