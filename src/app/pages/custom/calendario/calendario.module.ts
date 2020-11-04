import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCalendarModule, NbListModule, NbStepperModule } from '@nebular/theme';
import { CalendarioComponent } from './calendario.component';
import { NbSelectModule, NbButtonModule, NbInputModule, NbCheckboxModule, NbDialogModule, NbCardModule } from '@nebular/theme';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


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

  ],
  declarations: [CalendarioComponent],
  exports: [CalendarioComponent],
})
export class CalendarioModule { }