import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemListComponent } from './system-list.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCardModule, NbSelectModule, NbInputModule } from '@nebular/theme';
import { SelectComponent } from '../../../@theme/components/custom/select/select.component';
import { FormsModule } from '../../forms/forms.module';
import { AssociateElementsModule } from './associate-elements/associate-elements.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbSelectModule,
    AssociateElementsModule,
  ],
  entryComponents: [SelectComponent],
  declarations: [SystemListComponent],
  exports: [SystemListComponent],
})
export class SystemListModule { }
