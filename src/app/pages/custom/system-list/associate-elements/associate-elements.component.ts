import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-associate-elements',
  templateUrl: './associate-elements.component.html',
  styleUrls: ['./associate-elements.component.scss']
})
export class AssociateElementsComponent implements OnInit {
  enable: boolean;
  options = [
    { value: 'Si', label: 'Si' },
    { value: 'No', label: 'No' },
  ];
  option;

  constructor() { }

  ngOnInit() {
  }

}
