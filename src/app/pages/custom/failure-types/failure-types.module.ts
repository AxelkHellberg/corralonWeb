import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FailureTypesComponent } from './failure-types.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
  ],
  declarations: [FailureTypesComponent],
  exports: [FailureTypesComponent],
})
export class FailureTypesModule { }
