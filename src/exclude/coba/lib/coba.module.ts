import { NgModule } from '@angular/core';
import { CobaComponent } from './coba.component';
import { CobaDepModule } from '@try/coba-dep'
@NgModule({
  imports: [
    CobaDepModule
  ],
  declarations: [
    CobaComponent
  ],
  exports: [
    CobaComponent
  ]
})
export class CobaModule { }
