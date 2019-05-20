import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterTablePipe } from './filter-table.pipe';
import { UniqueValuesPipe } from './unique-values.pipe';
import { TextFromHtmlPipe } from './text-from-html.pipe';
import { FilterByPipe } from './filter-by.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    FilterTablePipe,
    UniqueValuesPipe,
    TextFromHtmlPipe,
    FilterByPipe,
  ],
  exports: [
    FilterTablePipe,
    UniqueValuesPipe,
    TextFromHtmlPipe,
    FilterByPipe,
  ],
})
export class CustomPipesModule { }
