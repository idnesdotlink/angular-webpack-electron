import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// module
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppLibModule } from './app-lib.module';

// component
import { AppRoot } from './shared/components/app-root';

// screens
import { screens } from './screens';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppLibModule,
    // MarkdownModule.forRoot(),
    SharedModule.forRoot(),
    AppRoutingModule,
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    AppRoot,
    ... screens
  ],
  providers: [HttpClientModule],
  bootstrap: [AppRoot],
  exports: [
    HttpClientModule,
    AppLibModule,
    // MarkdownModule,
    SharedModule
  ]
})
export class AppModule { }
