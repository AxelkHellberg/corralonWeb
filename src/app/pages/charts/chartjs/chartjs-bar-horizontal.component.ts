import { Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-chartjs-bar-horizontal',
  template: `
    <chart type="horizontalBar" [data]="data" [options]="options"></chart>
  `
})
export class ChartjsBarHorizontalComponent implements OnDestroy {
  @Input() data: any = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Dataset 1',
        backgroundColor: '#c492ee',
        borderWidth: 1,
        data: [
          this.random(),
          this.random(),
          this.random(),
          this.random(),
          this.random(),
          this.random()
        ]
      },
      {
        label: 'Dataset 2',
        backgroundColor: '#75d6e7',
        data: [
          this.random(),
          this.random(),
          this.random(),
          this.random(),
          this.random(),
          this.random()
        ]
      }
    ]
  };
  @Input() options: any = {
    responsive: true,
    maintainAspectRatio: false,
    elements: { rectangle: { borderWidth: 2 } },
    scales: {
      xAxes: [
        {
          gridLines: { display: true, color: '#cccccc' },
          ticks: { fontColor: '#484848' },
        },
      ],
      yAxes: [
        {
          gridLines: { display: false, color: '#cccccc' },
          ticks: { fontColor: '#484848' },
        },
      ],
    },
    legend: { position: 'right', labels: { fontColor: '#484848' } },
  };
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Dataset 1',
            backgroundColor: colors.infoLight,
            borderWidth: 1,
            data: [
              this.random(),
              this.random(),
              this.random(),
              this.random(),
              this.random(),
              this.random()
            ]
          },
          {
            label: 'Dataset 2',
            backgroundColor: colors.successLight,
            data: [
              this.random(),
              this.random(),
              this.random(),
              this.random(),
              this.random(),
              this.random()
            ]
          }
        ]
      };

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          rectangle: {
            borderWidth: 2
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor
              },
              ticks: {
                fontColor: chartjs.textColor
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor
              },
              ticks: {
                fontColor: chartjs.textColor
              }
            }
          ]
        },
        legend: {
          position: 'right',
          labels: {
            fontColor: chartjs.textColor
          }
        }
      };
      console.log(this.data, this.options);
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  private random() {
    return Math.round(Math.random() * 100);
  }
}
