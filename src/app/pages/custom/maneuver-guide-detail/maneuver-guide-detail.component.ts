import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GeneralService } from '../../../services/general.service';
@Component({
  selector: 'ngx-maneuver-guide-detail',
  templateUrl: './maneuver-guide-detail.component.html',
  styleUrls: ['./maneuver-guide-detail.component.scss']
})
export class ManeuverGuideDetailComponent implements OnInit {
  @Input() data: any;

  @Output() onClose = new EventEmitter();

  constructor(private generalService: GeneralService) { }


  ngOnInit() {
    console.log(this.data)

  }

}
