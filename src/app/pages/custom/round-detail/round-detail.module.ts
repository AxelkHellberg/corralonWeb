import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundDetailComponent } from './round-detail.component';
import { NbCardModule, NbButtonModule, NbAccordionModule, NbRadioModule } from '@nebular/theme';
import { TreeModule } from 'angular-tree-component';
import { FormsModule } from '@angular/forms';

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
  declarations: [RoundDetailComponent],
  exports: [RoundDetailComponent],
})
export class RoundDetailModule { }
