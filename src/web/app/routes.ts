import { Routes } from '@angular/router';
import { InstallScreen, LoginScreen, ExtraScreen, LogoScreen } from './screens';
import { LoadingGuard } from '@core/guards/loading.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    data: {
      name: 'login'
    }
  },
  {
    path: 'login',
    component: LoginScreen,
    data: {
      name: 'login'
    }
  },
  {
    path: 'install',
    component: InstallScreen,
    data: {
      name: 'install'
    }
  },
  {
    path: 'logo',
    component: LogoScreen,
    data: {
      name: 'logo'
    }
  },
  {
    path: 'admin',
    loadChildren: './extra/extra.module#ExtraModule',
    component: ExtraScreen
  }
];
export { routes };

