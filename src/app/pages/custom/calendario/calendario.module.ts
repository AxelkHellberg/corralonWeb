import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCalendarModule, NbListModule, NbStepperModule,NbDatepickerModule,NbAlertModule } from '@nebular/theme';
import { CalendarioComponent } from './calendario.component';
import { NbSelectModule, NbButtonModule, NbInputModule, NbCheckboxModule, NbDialogModule, NbCardModule } from '@nebular/theme';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




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
    NbAlertModule,
    ReactiveFormsModule,
    NbDatepickerModule,
    NbDatepickerModule.forRoot(),
    NgbTimepickerModule.forRoot(),
    FormsModule
    
    


  ],
  declarations: [CalendarioComponent],
  exports: [CalendarioComponent],
})
export class CalendarioModule { }