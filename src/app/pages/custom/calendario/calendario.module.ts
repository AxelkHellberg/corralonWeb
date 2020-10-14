import { NgModule } from '@angular/core';
import { NbCalendarModule } from '@nebular/theme';
import {CalendarioComponent} from './calendario.component';

@NgModule({

  imports:[NbCalendarModule],
  declarations: [CalendarioComponent],
  exports: [CalendarioComponent],
})
export class CalendarioModule { }