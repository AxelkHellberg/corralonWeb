import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCalendarModule } from '@nebular/theme';
import {CalendarioComponent} from './calendario.component';
import { NbSelectModule, NbButtonModule, NbInputModule, NbCheckboxModule, NbDialogModule, NbCardModule } from '@nebular/theme';



@NgModule({

  imports:[NbCalendarModule,CommonModule,NbSelectModule, NbButtonModule, NbInputModule, NbCheckboxModule, NbDialogModule, NbCardModule,
 ],
  declarations: [CalendarioComponent],
  exports: [CalendarioComponent],
})
export class CalendarioModule { }