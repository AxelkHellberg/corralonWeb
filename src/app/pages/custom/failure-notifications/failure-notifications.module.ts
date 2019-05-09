import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FailureNotificationsComponent } from './failure-notifications.component';
import { NbCardModule, NbSelectModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FilterTablePipe } from '../../../@theme/pipes/filter-table.pipe';

@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    NbSelectModule,
    Ng2SmartTableModule,
  ],
  declarations: [FailureNotificationsComponent, FilterTablePipe],
  exports: [FailureNotificationsComponent],
})
export class FailureNotificationsModule { }
