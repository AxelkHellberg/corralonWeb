import { CustomPipesModule } from './../../../@theme/pipes/custom-pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundReportsComponent } from './round-reports.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbSelectModule, NbInputModule, NbDatepickerModule } from '@nebular/theme';
import { CustomDirectivesModule } from '../../../@theme/directives/custom-directives.module';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    NbSelectModule,
    CustomPipesModule,
    NbDatepickerModule,
    NbInputModule,
    CustomDirectivesModule,
  ],
  declarations: [RoundReportsComponent],
  exports: [RoundReportsComponent],
})
export class RoundReportsModule { }
