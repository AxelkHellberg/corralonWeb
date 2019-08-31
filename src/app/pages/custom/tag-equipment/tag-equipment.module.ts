import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagEquipmentComponent } from './tag-equipment.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
  ],
  declarations: [TagEquipmentComponent],
  exports: [TagEquipmentComponent],
})
export class TagEquipmentModule { }
