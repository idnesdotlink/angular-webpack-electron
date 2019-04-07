import {Component} from '@angular/core';
import {Input} from '@angular/core';

const chartColorScheme = {
  domain: ['#FFB300', '#E64A19', '#76ff03', '#2979ff', '#EC407A', '#BA68C8', '#fdd835', '#0091ea', '#ff8f00']
};

@Component({
  selector: 'chart-bar',
  templateUrl: 'template.html',
  styles: [
    `
      :host {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    `
  ],
  preserveWhitespaces: false
})
export class ChartBarComponent {

  @Input() mode: 'horizontal' | 'vertical' = 'horizontal';

  view = null;

  results: any[] = [
    {
      name: 'Bronze',
      value: 30
    },
    {
      name: 'Silver',
      value: 20
    },
    {
      name: 'Gold',
      value: 20
    },
    {
      name: 'Diamond',
      value: 10
    },
    {
      name: 'Double Diamond',
      value: 5
    },
    {
      name: 'Triple Diamond',
      value: 10
    },
    {
      name: 'Ambassador',
      value: 10
    },
    {
      name: 'Double Ambassador',
      value: 10
    },
    {
      name: 'Triple Ambassador',
      value: 10
    }
  ];

  colorScheme = chartColorScheme;
  onSelect(e: any) { }
}
