import * as ngPackage from 'ng-packagr';
import { join } from 'path';
import { src_path } from '../constants/paths';

const lib_path = join(src_path, 'lib', 'color-picker', 'package.json');

ngPackage
  .ngPackagr()
  .forProject(lib_path)
  // .withTsConfig('tsconfig.lib.json')
  .build()
  .catch(error => {
    console.error(error);
    process.exit(1);
  });