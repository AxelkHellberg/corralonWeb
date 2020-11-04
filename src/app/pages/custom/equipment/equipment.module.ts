import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentComponent } from './equipment.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AssociateElementsModule } from '../system-list/associate-elements/associate-elements.module';

@NgModule({
  imports: [
    CommonModule,
    AssociateElementsModule,
    Ng2SmartTableModule,
    
  ],
  declarations: [EquipmentComponent],
  exports: [EquipmentComponent],
})
export class EquipmentModule { }
