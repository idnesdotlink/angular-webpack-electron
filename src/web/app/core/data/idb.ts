import Dexie from 'dexie';
class WorkerDB extends Dexie {
  constructor() {
    super('AutodriveIDB');
    const Version = this.version(1);
    Version.stores({
      members: 'id, parentId, name, level, memberId, parentMemberId, address, email',
      users: '++id, loginName',
      preferences: '++id, key, value',
      config: 'secure, host, port, key',
      icons: 'title, text, code'
    });
  }
}
export  { WorkerDB };
