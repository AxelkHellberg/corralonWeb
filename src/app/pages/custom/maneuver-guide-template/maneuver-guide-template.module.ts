import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManeuverGuideTemplateComponent } from './maneuver-guide-template.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NewManeuverGuideTemplateModule } from '../new-maneuver-guide-template/new-maneuver-guide-template.module';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    NewManeuverGuideTemplateModule,
  ],
  declarations: [ManeuverGuideTemplateComponent],
  exports: [ManeuverGuideTemplateComponent],
})
export class ManeuverGuideTemplateModule { }
