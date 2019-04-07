import Dexie from 'dexie';
import { defer, from } from 'rxjs';
import { config } from './config';

const deleteDatabase = () => {
  return defer(() => from(Dexie.delete(config.name)));
};

export { deleteDatabase };
