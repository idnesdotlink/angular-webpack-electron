import CopyWebpackPlugin from 'copy-webpack-plugin';
import { join } from 'path';
import { web_src_path, art_src_path, node_modules_path } from '../constants/paths';

const config = [
  { from: join(web_src_path, 'assets'), to: 'assets' },
  { from: join(art_src_path, 'favicon.ico') },
  { from: join(node_modules_path, '@angular', 'service-worker', 'ngsw-worker.js') },
];

const copyWebpackPlugin = new CopyWebpackPlugin(config);

export default copyWebpackPlugin;