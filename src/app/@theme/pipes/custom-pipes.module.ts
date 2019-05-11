import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterTablePipe } from './filter-table.pipe';
import { UniqueValuesPipe } from './unique-values.pipe';
import { TextFromHtmlPipe } from './text-from-html.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    FilterTablePipe,
    UniqueValuesPipe,
    TextFromHtmlPipe,
  ],
  exports: [
    FilterTablePipe,
    UniqueValuesPipe,
    TextFromHtmlPipe,
  ],
})
export class CustomPipesModule { }
