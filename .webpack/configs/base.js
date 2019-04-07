import { join } from 'path';
import nodeExternals from 'webpack-node-externals';
import { dev_env, no_aot_env } from '../constants/environments';
import { node_modules_path, web_src_path, web_dist_path } from '../constants/paths';
import plugins from './plugins';
import alias from './alias';
import dir_name from './dir_name';
import rules_aot from './rules';
import rules_no_aot from './rules_no_aot';

const rules = no_aot_env ? rules_no_aot : rules_aot;
const devtool = no_aot_env ? 'cheap-module-eval-source-map' : (dev_env ? 'eval' : 'source-map');

export default {
  mode: dev_env ? 'development' : 'production',
  devtool: devtool,
  entry: {
    fonts: [
      join(node_modules_path, 'material-design-icons', 'iconfont','material-icons.css'),
      join(node_modules_path, 'typeface-roboto', 'index.css')
    ],
    themes: [join(web_src_path, 'styles','themes.scss')],
    polyfills: join(web_src_path, dev_env ? 'polyfills.ts' : 'polyfills.prod.ts'),
    /* externals: [
      join(node_modules_path, 'faker', 'index.js'),
      join(node_modules_path, 'bluebird', 'js', 'browser', 'bluebird.js'),
      join(node_modules_path, 'marked', 'lib','marked.js'),
      join(node_modules_path, 'jsbarcode', 'bin','JsBarcode.js'),
    ], */
    main: join(web_src_path, dev_env ? 'main.ts' : 'main.prod.ts'),
    // worker2: join(src_path, 'worker', 'web.worker.ts'),
  },
  output: {
    path: web_dist_path,
    filename: (!dir_name) ? '[name].js' : `${dir_name}/[name].js`,
    globalObject: 'this',
    pathinfo: false
  },
  externals: [
    /* ... nodeExternals(
      {
        whitelist: [/^angular/]
      }
    ) */
  ],
  resolve: {
    extensions: ['.ts', '.js', '.scss', '.sass'],
    alias: alias
  },
  node: false,
  performance: {
    hints: false,
  },
  module: {
    rules: [... rules]
  },
  plugins: [
    ... plugins
  ]
};
