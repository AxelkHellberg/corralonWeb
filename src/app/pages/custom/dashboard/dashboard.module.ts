import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ChartjsPieComponent } from '../../charts/chartjs/chartjs-pie.component';
import { ChartjsBarHorizontalComponent } from '../../charts/chartjs/chartjs-bar-horizontal.component';
import { NbCardModule, NbListModule } from '@nebular/theme';
import { ChartsModule } from '../../charts/charts.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    ChartsModule,
    NbListModule,
    Ng2SmartTableModule
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
