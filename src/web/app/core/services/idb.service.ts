import Dexie from 'dexie';

/* export interface IMembers {
  id?: number;
  name?: string;
  level?: number;
  phone?: number;
  parentMemberId?: string;
  memberId?: string;
}

export interface IPreferences {
  id?: number;
  key?: string;
  value?: any;
}

export interface IUsers {
  id?: number;
  loginName?: string;
}

export interface IConfig {
  secure: boolean;
  host: string;
  port: number;
  key: string;
}

export interface IAuth {
  secure: boolean;
  host: string;
  port: number;
  key: string;
} */

export class IDBService extends Dexie {

  // members!: Dexie.Table<IMembers, number>;
  // users!: Dexie.Table<IUsers, number>;
  // preferences!: Dexie.Table<IPreferences, number>;
  // config!: Dexie.Table<IConfig, null>;

  constructor() {
    super('AutodriveIDB');
    const Version = this.version(1);
    const schema = {
      members: 'id, parentId, name, level, memberId, parentMemberId, address, email',
      users: '++id, loginName',
      preferences: '++id, key, value',
      config: 'secure, host, port, key',
      icons: 'title, text, code'
    };
    Version.stores(schema);
  }
}
