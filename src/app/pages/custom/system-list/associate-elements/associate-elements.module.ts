import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssociateElementsComponent } from './associate-elements.component';
import { NbInputModule, NbRadioModule, NbButtonModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NbInputModule,
    NbButtonModule,
    NbRadioModule,
    UiSwitchModule,
  ],
  declarations: [AssociateElementsComponent],
  exports: [AssociateElementsComponent],
})
export class AssociateElementsModule { }
