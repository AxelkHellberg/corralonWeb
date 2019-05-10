import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeasurementUnitsComponent } from './measurement-units.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
  ],
  declarations: [MeasurementUnitsComponent],
  exports: [MeasurementUnitsComponent],
})
export class MeasurementUnitsModule { }
