import Dexie from 'dexie';
import { WorkerDB } from './idb';
import { defer, from } from 'rxjs';

interface IMembers {
  id?: number;
  name?: string;
  level?: number;
  address?: string;
  parentMemberId?: string;
  memberId?: string;
  parentId?: number;
}

class MemberDB {
  table: Dexie.Table<IMembers, number>;
  constructor(idb: WorkerDB) {
    this.table = idb.table('members');
  }

  where(key: string, value: any) {
    return defer(() => from(this.table.where(key).equals(value).toArray()));
  }

  one(key: string, value: any) {
    return defer(() => from(this.table.where(key).equals(value).first()));
  }

  cnt(key: string, value: any) {
    return defer(() => from(this.table.where(key).equals(value).count()));
  }

  clear() {
    return defer(() => from(this.table.clear()));
  }
}

export { MemberDB, IMembers };

