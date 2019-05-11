import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FailureNotificationsComponent } from './failure-notifications.component';
import { NbCardModule, NbSelectModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FilterTablePipe } from '../../../@theme/pipes/filter-table.pipe';
import { UniqueValuesPipe } from '../../../@theme/pipes/unique-values.pipe';
import { TextFromHtmlPipe } from '../../../@theme/pipes/text-from-html.pipe';
import { CustomPipesModule } from '../../../@theme/pipes/custom-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    NbSelectModule,
    Ng2SmartTableModule,
    CustomPipesModule,
  ],
  declarations: [FailureNotificationsComponent],
  exports: [FailureNotificationsComponent],
})
export class FailureNotificationsModule { }
