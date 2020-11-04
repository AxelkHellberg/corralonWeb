import { NgModule,ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewRoundTemplateComponent } from './new-round-template.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbSelectModule, NbButtonModule, NbInputModule, NbCheckboxModule,NbCalendarModule, NbDialogModule, NbDialogService, NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { CustomPipesModule } from '../../../@theme/pipes/custom-pipes.module';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    FormsModule,
    CustomPipesModule,
    NbSelectModule,
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    NbCheckboxModule,
    NgbTimepickerModule,
    NbCalendarModule,
    
    
  ],
  declarations: [NewRoundTemplateComponent],
  providers: [NbDialogService],
  exports: [NewRoundTemplateComponent],
})
export class NewRoundTemplateModule { }
