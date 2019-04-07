import {Component} from '@angular/core';
const chartColorScheme = {
  domain: ['#FFB300', '#E64A19', '#76ff03', '#2979ff', '#EC407A', '#BA68C8', '#fdd835', '#0091ea', '#ff8f00']
};

@Component({
  selector: 'chart-line',
  templateUrl: 'template.html',
  styles: [
    `
      :host {
        display: inline-block;
        height: 100%;
        width: 100%;
      }
    `
  ],
  preserveWhitespaces: false
})
export class ChartLineComponent {

  colorScheme = chartColorScheme;

  view = null;

  // tslint
  results: any[] = [
    {
      name: 'A',
      series: [
        {
          name: 'Jan',
          value: 420
        },
        {
          name: 'Feb',
          value: 300
        },
        {
          name: 'Mar',
          value: 200
        },
        {
          name: 'Apr',
          value: 220
        }
      ]
    },

    {
      name: 'B',
      series: [
        {
          name: 'Jan',
          value: 490
        },
        {
          name: 'Feb',
          value: 450
        },
        {
          name: 'Mar',
          value: 350
        },
        {
          name: 'Apr',
          value: 230
        }
      ]
    },
    {
      name: 'C',
      series: [
        {
          name: 'Jan',
          value: 300
        },
        {
          name: 'Feb',
          value: 350
        },
        {
          name: 'Mar',
          value: 250
        },
        {
          name: 'Apr',
          value: 250
        }
      ]
    }
  ];

  onSelect(e: any) { }
}
