import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundTemplateComponent } from './round-template.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
  ],
  declarations: [RoundTemplateComponent],
  exports: [RoundTemplateComponent],
})
export class RoundTemplateModule { }
