import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemListComponent } from './system-list.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCardModule, NbSelectModule } from '@nebular/theme';
import { SelectComponent } from '../../../@theme/components/custom/select/select.component';
import { FormsModule } from '../../forms/forms.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbSelectModule,
  ],
  entryComponents: [SelectComponent],
  declarations: [SystemListComponent],
  exports: [SystemListComponent],
})
export class SystemListModule { }
