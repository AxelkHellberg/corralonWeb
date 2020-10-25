import { RoundsByUserData } from './../../../@models/dashboard';
import { BarHorizontalChartData } from './../../../@models/charts/bar-horizontal-chart';
import { Component, OnInit } from '@angular/core';
import { PieChartData } from '../../../@models/charts/pie-chart';
import { GeneralService } from '../../../services/general.service';
import { RoundsQuantity } from '../../../@models/dashboard';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  pieChartData: PieChartData;
  barHorizontalChartData: BarHorizontalChartData;

  constructor(private generalService: GeneralService) {
    this.getRoundsQuantity();
    this.getRoundsByUser();
  }

  async getRoundsQuantity() {
    try {
      const response: RoundsQuantity = await this.generalService.getRoundsQuantity(1);
      console.log("respose");
      console.log(response);

      this.pieChartData = {
        labels: ['Completas', 'Incompletas'],
        datasets: [{
          data: [+response.cantidadCompleta, +response.cantidadSinCompletar],
          backgroundColor: ['#88afff', '#c492ee'],
        }]
      }
    } catch (error) {
      console.log(error)

    }
  }

  async getRoundsByUser() {
    try {
      const response: RoundsByUserData[] = await this.generalService.getRoundsByUser(2);
      this.barHorizontalChartData = {
        labels: response.map(user => `${user.user_name} ${user.user_lastName}`),
        datasets: [
          {
            label: 'Completas',
            backgroundColor: '#c492ee',
            data: response.map(user => +user.cantidadRondasHechas),
          },
        ]
      }
    } catch (error) {

    }
  }

}
