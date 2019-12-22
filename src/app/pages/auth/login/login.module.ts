import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { NbCheckboxModule, NbSpinnerModule, NbToastrService } from '@nebular/theme';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    NbCheckboxModule,
    NbSpinnerModule,
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [NbToastrService]
})
export class LoginComponentModule { }
