import { IndexHtmlWebpackPlugin } from '@angular-devkit/build-angular/src/angular-cli-files/plugins/index-html-webpack-plugin';
import { web_src_path } from '../constants/paths';
import { join } from 'path';
const config = {
  input: join(web_src_path, 'index.html'),
  output: 'index.html',
  entrypoints: [
    'fonts',
    'themes',
    'polyfills',
    'main',
  ]
};
const indexHtmlWebpackPlugin = new IndexHtmlWebpackPlugin(config);
export default indexHtmlWebpackPlugin;