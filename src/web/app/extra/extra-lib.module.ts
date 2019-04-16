import { NgModule } from '@angular/core';
import { SvgChartsModule } from '@try/svg-chart';
import { MarkdownModule } from '@try/mark-down';
import { ColorPickerModule } from '@try/color-picker';
import { ScrollToModule } from '@lib/scroll-to';
import { MaskModule } from '@try/input-mask';
// import { ContextMenuModule as Ctx2 } from '@lib/context-menu2';

const modules = [
  SvgChartsModule,
  ColorPickerModule,
  ScrollToModule,
  // Ctx2
];

@NgModule({
  imports: [...modules, MarkdownModule.forChild(), MaskModule.forChild()],
  exports: [...modules, MarkdownModule, MaskModule],
  providers: []
})
export class ExtraLibModule { }
