import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentComponent } from './equipment.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AssociateElementsModule } from '../system-list/associate-elements/associate-elements.module';
import { NbCardModule, NbListModule } from '@nebular/theme';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [
    CommonModule,
    AssociateElementsModule,
    Ng2SmartTableModule,
    NbListModule,
    NbCardModule,
  ],
  declarations: [EquipmentComponent, TableComponent],
  exports: [EquipmentComponent],
})
export class EquipmentModule { }
