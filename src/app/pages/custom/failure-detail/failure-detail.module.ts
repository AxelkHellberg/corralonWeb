import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FailureDetailComponent } from './failure-detail.component';
import { NbCardModule, NbDialogService, NbButtonModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NgbDropdownModule,
    FormsModule,
  ],
  providers: [NbDialogService],
  declarations: [FailureDetailComponent],
  exports: [FailureDetailComponent],
})
export class FailureDetailModule { }
