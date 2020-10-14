import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevaTareaComponent } from './nueva-tarea.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbSelectModule, NbButtonModule, NbInputModule, NbCheckboxModule, NbDialogModule, NbDialogService, NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { CustomPipesModule } from '../../../@theme/pipes/custom-pipes.module';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NbCalendarModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    FormsModule,
    CustomPipesModule,
    NbSelectModule,
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    NbCheckboxModule,
    NgbTimepickerModule,
    NbCalendarModule,
  ],
  declarations: [NuevaTareaComponent],
  providers: [NbDialogService],
  exports: [NuevaTareaComponent],
})
export class NuevaTareaModule { }
