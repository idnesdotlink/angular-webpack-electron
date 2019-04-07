import { LoadingService as LOADING } from './loading.service';
import { ApiService as API } from './api.service';
import { AuthenticationService as Auth } from './authentication.service';
import { IDBService as IDB } from './idb.service';
import { ThemeService as Theme } from './theme.service';
import { PreferenceService as Preference } from './preference.service';
import { RouteNameService as RouteName } from './routename.service';
import { ScreenService as SCREEN } from './screen.service';
import { SizeService as SIZE } from './size.service';
import { DummyService as Dummy } from './dummy.service';
import { SizingService as SIZING } from './sizing.service';
import { WorkerService as WORKER } from './worker.service';
import { AddressesService } from './addresses.service';
import { AddressService } from './address.service';
import { MembersService } from './members.api.service';

const providers = [
  API, Auth, IDB,
  Theme, RouteName, Preference,
  SCREEN, LOADING, SIZE,
  AddressService, AddressesService,
  MembersService,
  Dummy, SIZING, WORKER ];
export {
  API, Auth, IDB,
  Theme, RouteName,
  Preference, Dummy, SCREEN,
  LOADING, SIZE, SIZING,
  WORKER, AddressService,
  MembersService,
  AddressesService, providers
};

