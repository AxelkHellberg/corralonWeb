import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManeuverGuideDetailComponent } from './maneuver-guide-detail.component';
import { NbCardModule, NbButtonModule, NbAccordionModule, NbRadioModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { TreeModule } from 'angular-tree-component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    NbButtonModule,
    NbAccordionModule,
    NbRadioModule,
    TreeModule,
  ],
  declarations: [ManeuverGuideDetailComponent],
  exports: [ManeuverGuideDetailComponent],
})
export class ManeuverGuideDetailModule { }
