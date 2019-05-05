import { BarHorizontalChartData } from './../../../@models/charts/bar-horizontal-chart';
import { Component, OnInit } from '@angular/core';
import { PieChartData } from '../../../@models/charts/pie-chart';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  pieChartData: PieChartData;
  barHorizontalChartData: BarHorizontalChartData;

  constructor() { }

  ngOnInit() {
    this.pieChartData = {
      labels: ['Completas', 'Incompletas',],
      datasets: [{
        data: [800, 200],
        backgroundColor: ['#88afff', '#c492ee'],
      }],
    };

    const randomNumber = () => Math.round(Math.random() * 100);

    this.barHorizontalChartData = {
      labels: ['Usuario 1', 'Usuario 2', 'Usuario 3', 'Usuario 4', 'Usuario 5', 'Usuario 6'],
      datasets: [
        {
          label: 'Incompletas',
          backgroundColor: '#88afff',
          borderWidth: 1,
          data: [randomNumber(), randomNumber(), randomNumber(), randomNumber(), randomNumber(), randomNumber()],
        },
        {
          label: 'Completas',
          backgroundColor: '#c492ee',
          data: [randomNumber(), randomNumber(), randomNumber(), randomNumber(), randomNumber(), randomNumber()],
        },
      ],
    };
  }

}
