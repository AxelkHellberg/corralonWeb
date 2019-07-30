import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbDatepickerModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CustomDirectivesModule } from '../../../@theme/directives/custom-directives.module';
import { CustomPipesModule } from './../../../@theme/pipes/custom-pipes.module';
import { ManeuverGuideReportsComponent } from './maneuver-guide-reports.component';

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
  declarations: [ManeuverGuideReportsComponent],
  exports: [ManeuverGuideReportsComponent],
})
export class ManeuverGuideReportsModule { }
