import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagListComponent } from './tag-list.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
  ],
  declarations: [TagListComponent],
  exports: [TagListComponent],
})
export class TagListModule { }
