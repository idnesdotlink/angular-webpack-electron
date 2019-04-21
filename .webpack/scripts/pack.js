import { join } from 'path';
import { readdirSync, statSync } from 'fs';
import { src_path } from '../constants/paths';
import { each, reduce } from 'lodash';
import * as ngPackage from 'ng-packagr';
import { rep } from './eol';

const lib_path = join(src_path, 'lib');

const files = readdirSync(lib_path);
const f = [];
each(files, (o) => {
  const path_to_dir = join(lib_path, o);
  const package_json = join(path_to_dir, 'package.json');
  try {
    const dir = statSync(path_to_dir);
    const json = statSync(package_json);
    if (dir.isDirectory() && json.isFile()) {

      f.push(() => ngPackage
        .ngPackagr()
        .forProject(package_json)
        // .withTsConfig('tsconfig.lib.json')
        .build()
        .then(() => ('ok'))
      )
    }

  } catch { }
});

const promiseSerial = funcs => funcs.reduce((promise, func) => promise.then(result => func().then(Array.prototype.concat.bind(result))), Promise.resolve([]));

promiseSerial(f)
  .then(console.log.bind(console))
  .then(() => rep())
  .catch(console.error.bind(console));
