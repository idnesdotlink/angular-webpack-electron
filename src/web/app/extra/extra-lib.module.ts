import { NgModule } from '@angular/core';
import { SvgChartsModule } from '@lib/svg-chart';
import { MarkdownModule } from '@lib/mark-down';
import { ColorPickerModule } from '@lib/color-picker';
import { ScrollToModule } from '@lib/scroll-to';
import { NgxMaskModule } from '@lib/input-mask';
// import { ContextMenuModule as Ctx2 } from '@lib/context-menu2';

const modules = [
  SvgChartsModule,
  ColorPickerModule,
  ScrollToModule,
  // Ctx2
];

@NgModule({
  imports: [... modules, MarkdownModule.forChild(), NgxMaskModule.forChild()],
  exports: [... modules, MarkdownModule, NgxMaskModule],
  providers: []
})
export class ExtraLibModule { }
