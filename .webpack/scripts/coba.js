import * as ngPackage from 'ng-packagr';
import { join } from 'path';
import { src_path, root_path } from '../constants/paths';

const lib_path = join(src_path, 'lib', 'coba-dep', 'package.json');
const lib_path2 = join(src_path, 'lib', 'coba', 'package.json');
const tsconf = join(src_path, 'lib', 'coba', 'tsconfig.json');

ngPackage
  .ngPackagr()
  .forProject(lib_path)
  // .withTsConfig('tsconfig.lib.json')
  .build()
  .catch(error => {
    console.error(error);
    process.exit(1);
  }).then(
    () => ngPackage
      .ngPackagr()
      .forProject(lib_path2)
      .withTsConfig(tsconf)
      .build()
      .catch(error => {
        console.error(error);
        process.exit(1);
      })
  );
