import { NgModule } from '@angular/core';
import { PhonePipe } from './phone.pipe';
import { PhoneDirective } from './phone.directive';

@NgModule({
  declarations: [ PhonePipe, PhoneDirective ],
  exports: [ PhonePipe, PhoneDirective ]
})
export class PhonePipeModule {}
