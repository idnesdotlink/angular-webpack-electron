import {Component} from '@angular/core';
import {Input} from '@angular/core';
const chartColorScheme = {
  domain: ['#FFB300', '#E64A19', '#76ff03', '#2979ff', '#EC407A', '#BA68C8', '#fdd835', '#0091ea', '#ff8f00']
};

@Component({
  selector: 'chart-bar-group',
  templateUrl: 'template.html',
  preserveWhitespaces: false,
  styles: [
    `
      :host {
        display: inline-block;
        height: 100%;
        width: 100%;
      }
    `
  ]
})
export class ChartBarGroupComponent {

  @Input() mode: 'horizontal' | 'vertical' = 'horizontal';

  colorScheme = chartColorScheme;

  view = null;

  results: any[] = [
    {
      name: 'Germany',
      series: [
        {
          name: '2010',
          value: 40632
        },
        {
          name: '2000',
          value: 36953
        },
        {
          name: '1990',
          value: 31476
        }
      ]
    },
    {
      name: 'United States',
      series: [
        {
          name: '2010',
          value: 49737
        },
        {
          name: '2000',
          value: 45986
        },
        {
          name: '1990',
          value: 37060
        }
      ]
    },
    {
      name: '31-11-2012',
      series: [
        {
          name: '2010',
          value: 36745
        },
        {
          name: '2000',
          value: 34774
        },
        {
          name: '1990',
          value: 29476
        }
      ]
    },
    {
      name: '31-11-2013',
      series: [
        {
          name: '2010',
          value: 36240
        },
        {
          name: '2000',
          value: 32543
        },
        {
          name: '1990',
          value: 26424
        }
      ]
    }
  ];

  onSelect(e: any) { }
}
