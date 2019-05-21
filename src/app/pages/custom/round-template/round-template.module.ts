import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundTemplateComponent } from './round-template.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NewRoundTemplateModule } from '../new-round-template/new-round-template.module';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    NewRoundTemplateModule,
  ],
  declarations: [RoundTemplateComponent],
  exports: [RoundTemplateComponent],
})
export class RoundTemplateModule { }
