import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemsTypeComponent } from './systems-type.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
  ],
  declarations: [SystemsTypeComponent],
  exports: [SystemsTypeComponent],
})
export class SystemsTypeModule { }
