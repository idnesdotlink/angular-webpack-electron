import { AngularCompilerPlugin } from '@ngtools/webpack';
import { join } from 'path';
import { web_src_path } from '../constants/paths';
import { dev_env } from '../constants/environments';

const config = {
  mainPath: join(web_src_path, 'main.ts'),
  sourceMap: true,
  nameLazyFiles: dev_env,
  tsConfigPath: join(web_src_path, 'tsconfig.json'),
  skipCodeGeneration: dev_env
};

if (!dev_env) {
  config.hostReplacementPaths = {
    [join(web_src_path, 'environments', 'environment.ts')]: join(web_src_path, 'environments', 'environment.prod.ts'),
    [join(web_src_path, 'polyfills.ts')]: join(web_src_path, 'polyfills.prod.ts')
  }
}

const angularCompilerPlugin = new AngularCompilerPlugin(config);


export default angularCompilerPlugin;