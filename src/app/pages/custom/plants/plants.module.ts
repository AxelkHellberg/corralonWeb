import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantsComponent } from './plants.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbDialogModule, NbCardModule, NbInputModule, NbButtonModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SmartTableModule,
    NbDialogModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
  ],
  declarations: [PlantsComponent],
  exports: [PlantsComponent]
})
export class PlantsModule { }
