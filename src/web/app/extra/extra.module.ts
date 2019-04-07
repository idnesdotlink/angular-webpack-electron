import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { screens } from './screens';
import { SharedModule } from '../shared/shared.module';
import { ExtraRoutingModule } from './extra-routing.module';
import { ExtraLibModule } from './extra-lib.module';

import { ChartBar } from './components/chart-bar';
import { ChartBarGroup } from './components/chart-bar-group';
import { ChartDonut } from './components/chart-donut';
import { ChartLine } from './components/chart-line';

import { SvgG } from './components/svg-g';
import { SvgSvg } from './components/svg-svg';
import { TreeViewer } from './components/tree-viewer';

import { ConfirmDialog } from './components/confirm-dialog';
import { PageBottomSheet } from './components/page-bottom-sheet';
import { SnackbarNotification } from './components/snackbar-notification';
import { MemberTable } from './components/member-table';
import { FilterBox } from './components/filter-box';

import { HomeCard } from './components/home-card';

const svgTree = [
  SvgG,
  SvgSvg,
  TreeViewer
];

const chart = [
  ChartBar,
  ChartBarGroup,
  ChartDonut,
  ChartLine,
];

const various = [
  ConfirmDialog,
  PageBottomSheet,
  SnackbarNotification,
  FilterBox,
  MemberTable
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ExtraLibModule,
    ExtraRoutingModule
  ],
  declarations: [
    ... chart,
    ...svgTree,
    ... screens,
    ... various,
    HomeCard
  ],
})
export class ExtraModule { }
