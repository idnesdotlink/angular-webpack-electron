import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';

import { ColorPickerComponent } from './color-picker.component';
import { PopoverComponent } from './popover/popover.component';
import { InsidePopoverComponent } from './inside-popover/inside-popover.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [ColorPickerComponent, PopoverComponent, InsidePopoverComponent],
  exports: [ColorPickerComponent],
  entryComponents: [PopoverComponent, InsidePopoverComponent]
})
export class ColorPickerModule { }
