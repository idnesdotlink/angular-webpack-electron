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
  const config_json = join(path_to_dir, 'tsconfig.lib.json');
  try {
    // const dir = statSync(path_to_dir);
    // const json = statSync(package_json);
    // const tsconf = statSync(config_json);
    if (statSync(path_to_dir).isDirectory()) {
      if (statSync(package_json).isFile()) {
        f.push(() => {
          let pack = ngPackage
            .ngPackagr()
            .forProject(package_json);
          try {
            if (statSync(config_json).isFile()) pack.withTsConfig('tsconfig.lib.json');
          } catch (e) { }
          return pack.build()
            .then(() => ('ok'));
        })
      }
    }

  } catch (e) { }
});

const promiseSerial = funcs => funcs.reduce((promise, func) => promise.then(result => func().then(Array.prototype.concat.bind(result))), Promise.resolve([]));

promiseSerial(f)
  .then(console.log.bind(console))
  .then(() => rep())
  .catch(console.error.bind(console));
