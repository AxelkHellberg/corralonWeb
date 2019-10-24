import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-maneuver-guide-detail',
  templateUrl: './maneuver-guide-detail.component.html',
  styleUrls: ['./maneuver-guide-detail.component.scss']
})
export class ManeuverGuideDetailComponent implements OnInit {
  @Input() data: any;

  @Output() onClose = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(this.data)
  }

}
