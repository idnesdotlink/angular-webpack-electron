import {trigger, transition, style, animate, state} from '@angular/animations'
export const expandTableRows = trigger('detailExpand', [
  state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
  state('expanded', style({height: '*'})),
  transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
]);
