import { Routes } from '@angular/router';
import {
  AdminScreen, MemberScreen,
  AccountScreen, PreferenceScreen,
  DevScreen, HelpScreen,
  PosScreen, MemberAddScreen,
  MasterScreen
} from './screens';
import { LoadingGuard } from '@core/guards/loading.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: AdminScreen,
    data: {
      name: 'home'
    }
  },
  {
    path: 'member',
    component: MemberScreen,
    data: {
      name: 'member'
    }
  },
  {
    path: 'memberadd',
    component: MemberAddScreen,
    data: {
      name: 'memberadd'
    }
  },
  {
    path: 'account',
    component: AccountScreen,
    data: {
      name: 'account'
    }
  },
  {
    path: 'preference',
    component: PreferenceScreen,
    data: {
      name: 'preference'
    }
  },
  {
    path: 'dev',
    component: DevScreen,
    data: {
      name: 'dev'
    }
  },
  {
    path: 'help',
    component: HelpScreen,
    data: {
      name: 'help'
    }
  },
  {
    path: 'pos',
    component: PosScreen,
    data: {
      name: 'pos'
    }
  },
  {
    path: 'master',
    component: MasterScreen,
    data: {
      name: 'master'
    }
  }
];
export { routes };

