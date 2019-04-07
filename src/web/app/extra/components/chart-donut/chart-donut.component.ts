import {Component} from '@angular/core';
const chartColorScheme = {
  domain: ['#FFB300', '#E64A19', '#76ff03', '#2979ff', '#EC407A', '#BA68C8', '#fdd835', '#0091ea', '#ff8f00']
};

@Component({
  selector: 'member-donut-chart',
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
export class ChartDonutComponent {

  view = null;

  results: any[] = [
    {
      name: 'Bronze',
      value: 15000
    },
    {
      name: 'Silver',
      value: 2380
    },
    {
      name: 'Gold',
      value: 1250
    },
    {
      name: 'Diamond',
      value: 678
    },
    {
      name: 'Double Diamond',
      value: 40
    },
    {
      name: 'Triple Diamond',
      value: 10
    },
    {
      name: 'Ambassador',
      value: 2
    },
    {
      name: 'Double Ambassador',
      value: 3
    },
    {
      name: 'Triple Ambassador',
      value: 5
    },
    {
      name: 'Double Ambassador',
      value: 4
    },
    {
      name: 'Triple Ambassador',
      value: 2
    }
  ];

  colorScheme = chartColorScheme;

  onSelect(e: any) { }
}
