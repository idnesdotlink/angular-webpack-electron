import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { hmrBootstrap } from './hmr';
const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

declare var module: any;

if (module.hot) {
  hmrBootstrap(module, bootstrap);
} else {
  console.error('HMR is not enabled for webpack-dev-server!');
  console.log('Are you using the --hmr flag for ng serve?');
}
