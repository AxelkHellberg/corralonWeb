import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManeuverGuideTemplateComponent } from './maneuver-guide-template.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
  ],
  declarations: [ManeuverGuideTemplateComponent],
  exports: [ManeuverGuideTemplateComponent],
})
export class ManeuverGuideTemplateModule { }
