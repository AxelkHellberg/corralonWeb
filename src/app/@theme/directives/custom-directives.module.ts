import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyInputDirective } from './empty-input.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [EmptyInputDirective],
  exports: [EmptyInputDirective],
})
export class CustomDirectivesModule { }
