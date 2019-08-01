import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-maneuver-guide-detail',
  templateUrl: './maneuver-guide-detail.component.html',
  styleUrls: ['./maneuver-guide-detail.component.scss']
})
export class ManeuverGuideDetailComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
