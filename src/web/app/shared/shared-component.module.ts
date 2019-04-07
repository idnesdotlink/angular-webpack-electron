import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';
// import { AngularSplitModule } from 'angular-split';
import { AngularSplitModule } from '@lib/split-pane';
import { ClickOutsideModule } from '@lib/click-outside';

import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { AppLogo } from './components/app-logo';
import { AppBase } from './components/app-base';
import { AppTheme } from './components/app-theme';
import { ScrollPadding } from './components/scroll-padding';
import { BoxPadding } from './components/box-padding';
import { PageStandard } from './components/page-standard';
import { SearchDemoComponent } from './components/search/search.component';
import { FileUploadDemoComponent } from './components/file-upload/file-upload.component';
import { QRCodeModule } from '@lib/qrcode';
import { BarcodeModule } from '@lib/barcode';
import { ContextMenuModule } from '@lib/context-menu';
import { AngularResizedEventModule } from '@lib/resize-event';
import { ScrollToModule } from '@lib/scroll-to';
import { DigitOnlyModule } from '@lib/digit-only';
import {
  CovalentCommonModule,
  CovalentSearchModule,
  CovalentFileModule,
  CovalentBreadcrumbsModule
} from '@lib/tera-data';
import { ContextMenuModule as ContextMenuModule2 } from '@lib/context-menu2';
import { PhonePipeModule } from '@lib/phone-pipe/lib/phonepipe.module';
import { NgxMaskModule } from '@lib/input-mask';
import { MatPasswordStrengthModule } from '@lib/password-strength';
import { MatCalendarModule } from '@lib/calendar';

const components = [
  AppBase,
  AppTheme,
  AppLogo,
  ScrollPadding,
  BoxPadding,
  PageStandard,
  SearchDemoComponent,
  FileUploadDemoComponent
];

const modules = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  FlexLayoutModule,
  ContextMenuModule,
  MaterialModule,
  DigitOnlyModule,
  CovalentCommonModule,
  CovalentSearchModule,
  CovalentFileModule,
  CovalentBreadcrumbsModule,
  QRCodeModule,
  BarcodeModule,
  AngularResizedEventModule,
  ContextMenuModule2,
  ClickOutsideModule,
  PhonePipeModule,
  // SharedLibModule
];

const imported = [
  ...modules,
  NgxMaskModule.forRoot(),
  ScrollToModule.forRoot(),
  AngularSplitModule.forRoot(),
  MatPasswordStrengthModule.forRoot(),
  MatCalendarModule.forRoot()
];

const exported = [
  ...modules,
  ScrollToModule,
  AngularSplitModule,
  MatPasswordStrengthModule,
  MatCalendarModule,
  components
];

@NgModule({
  imports: [
    ...imported
  ],
  declarations: [...components],
  exports: exported
})
export class SharedComponentModule { }
