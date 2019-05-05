import { Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { NbJSThemeOptions } from '@nebular/theme/services/js-themes/theme.options';

@Component({
  selector: 'ngx-chartjs-pie',
  template: `
    <chart type="pie" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsPieComponent {
  @Input() options: any = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          display: false,
        },
      ],
      yAxes: [
        {
          display: false,
        },
      ],
    },
    legend: {
      labels: {
        fontColor: '#484848',
      },
    },
  };
  @Input() data: any = {
    labels: ['Download Sales', 'In-Store Sales', 'Mail Sales'],
    datasets: [{
      data: [300, 500, 100],
      backgroundColor: ['#88afff', '#c492ee', '#75d6e7'],
    }],
  };
  themeSubscription: any;

  constructor() { }
}
