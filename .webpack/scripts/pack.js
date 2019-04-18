import * as ngPackage from 'ng-packagr';
import { join } from 'path';
import { src_path } from '../constants/paths';

const lib_path = join(src_path, 'lib', 'color-picker', 'package.json');
const lib_path2 = join(src_path, 'lib', 'svg-chart', 'package.json');
const lib_path3 = join(src_path, 'lib', 'pipes', 'package.json');
const lib_path4 = join(src_path, 'lib', 'context-menu', 'package.json');
const lib_path5 = join(src_path, 'lib', 'tcommon', 'package.json');
const lib_path6 = join(src_path, 'lib', 'tfile', 'package.json');
const lib_path7 = join(src_path, 'lib', 'tsearch', 'package.json');
const lib_path8 = join(src_path, 'lib', 'tbreadcrumbs', 'package.json');

ngPackage
  .ngPackagr()
  .forProject(lib_path)
  // .withTsConfig('tsconfig.lib.json')
  .build()
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

ngPackage
  .ngPackagr()
  .forProject(lib_path2)
  // .withTsConfig('tsconfig.lib.json')
  .build()
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

ngPackage
  .ngPackagr()
  .forProject(lib_path4)
  // .withTsConfig('tsconfig.lib.json')
  .build()
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

// ngPackage
//   .ngPackagr()
//   .forProject(lib_path5)
//   // .withTsConfig('tsconfig.lib.json')
//   .build()
//   .catch(error => {
//     console.error(error);
//     process.exit(1);
//   });

ngPackage
  .ngPackagr()
  .forProject(lib_path6)
  // .withTsConfig('tsconfig.lib.json')
  .build()
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

ngPackage
  .ngPackagr()
  .forProject(lib_path7)
  // .withTsConfig('tsconfig.lib.json')
  .build()
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

ngPackage
  .ngPackagr()
  .forProject(lib_path8)
  // .withTsConfig('tsconfig.lib.json')
  .build()
  .catch(error => {
    console.error(error);
    process.exit(1);
  });