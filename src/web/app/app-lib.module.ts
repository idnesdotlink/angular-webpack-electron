import { NgModule } from '@angular/core';
import { MarkdownModule } from '@try/mark-down';
// import { DigitOnlyModule } from '@lib/digit-only';
@NgModule({
  imports: [
    MarkdownModule.forRoot(),
    // DigitOnlyModule
  ],
  exports: [
    MarkdownModule,
    // DigitOnlyModule
  ]
})
export class AppLibModule { }
