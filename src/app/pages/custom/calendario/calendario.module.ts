import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCalendarModule, NbListModule, NbStepperModule,NbDatepickerModule } from '@nebular/theme';
import { CalendarioComponent } from './calendario.component';
import { NbSelectModule, NbButtonModule, NbInputModule, NbCheckboxModule, NbDialogModule, NbCardModule } from '@nebular/theme';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({

  imports: [NbCalendarModule,
    CommonModule,
    NbSelectModule,
    NbButtonModule,
    NbInputModule,
    NbCheckboxModule,
    NbDialogModule,
    NbCardModule,
    NgbTimepickerModule,
    FormsModule,
    NbStepperModule,
    NbListModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    NbDatepickerModule,


  ],
  declarations: [CalendarioComponent],
  exports: [CalendarioComponent],
})
export class CalendarioModule { }