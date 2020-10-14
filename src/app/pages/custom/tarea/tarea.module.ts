import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TareaComponent } from './tarea.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {NuevaTareaModule} from '../nueva-tarea/nueva-tarea.module';

@NgModule({

  imports: [
    Ng2SmartTableModule,
    NuevaTareaModule,
    CommonModule,
  ],
  declarations: [TareaComponent],
  exports: [TareaComponent],
})
export class TareaModule { }