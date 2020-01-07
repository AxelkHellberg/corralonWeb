import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemListComponent } from './system-list.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCardModule, NbSelectModule, NbInputModule, NbDialogService, NbButtonModule } from '@nebular/theme';
import { SelectComponent } from '../../../@theme/components/custom/select/select.component';
import { FormsModule } from '@angular/forms';
import { AssociateElementsModule } from './associate-elements/associate-elements.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbSelectModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
    AssociateElementsModule,
  ],
  entryComponents: [SelectComponent],
  providers: [NbDialogService],
  declarations: [SystemListComponent],
  exports: [SystemListComponent],
})
export class SystemListModule { }
