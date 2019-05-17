import { Component, OnInit, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-failure-detail',
  templateUrl: './failure-detail.component.html',
  styleUrls: ['./failure-detail.component.scss']
})
export class FailureDetailComponent implements OnInit {
  @Output() onClose = new EventEmitter<void>();
  selectedStatus: string = 'DETECTADO';
  @ViewChild('changestatus') changeStatusTemplate: TemplateRef<any>;

  constructor(private dialogService: NbDialogService) { }

  ngOnInit() {
  }

  changeStatus(status: string) {
    this.dialogService.open(this.changeStatusTemplate);
    this.selectedStatus = status;
  }

  close() {
    this.onClose.emit();
  }

}
