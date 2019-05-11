import { CustomPipesModule } from './../../../@theme/pipes/custom-pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundReportsComponent } from './round-reports.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbSelectModule } from '@nebular/theme';
import { FilterTablePipe } from '../../../@theme/pipes/filter-table.pipe';
import { UniqueValuesPipe } from '../../../@theme/pipes/unique-values.pipe';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    NbSelectModule,
    CustomPipesModule,
  ],
  declarations: [RoundReportsComponent],
  exports: [RoundReportsComponent],
})
export class RoundReportsModule { }
