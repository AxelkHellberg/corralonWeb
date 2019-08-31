import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagSystemComponent } from './tag-system.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
  ],
  declarations: [TagSystemComponent],
  exports: [TagSystemComponent],
})
export class TagSystemModule { }
