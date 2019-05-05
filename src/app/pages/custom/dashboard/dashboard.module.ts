import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ChartjsPieComponent } from '../../charts/chartjs/chartjs-pie.component';
import { ChartjsBarHorizontalComponent } from '../../charts/chartjs/chartjs-bar-horizontal.component';
import { NbCardModule } from '@nebular/theme';
import { ChartsModule } from '../../charts/charts.module';

@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    ChartsModule,
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
