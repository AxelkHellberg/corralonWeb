import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewManeuverGuideTemplateComponent } from './new-maneuver-guide-template.component';
import { NbInputModule, NbSelectModule, NbButtonModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { CustomPipesModule } from '../../../@theme/pipes/custom-pipes.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NbInputModule,
    NbButtonModule,
    Ng2SmartTableModule,
    NbSelectModule,
    CustomPipesModule,
  ],
  declarations: [NewManeuverGuideTemplateComponent],
  exports: [NewManeuverGuideTemplateComponent],
})
export class NewManeuverGuideTemplateModule { }
