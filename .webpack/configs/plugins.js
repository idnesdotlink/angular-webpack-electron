import { dev_env, no_aot_env } from '../constants/environments';
import { SuppressExtractedTextChunksWebpackPlugin } from '@angular-devkit/build-angular/src/angular-cli-files/plugins/suppress-entry-chunks-webpack-plugin';
import { ProgressPlugin } from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import angularCompilerPlugin from '../plugins/angularCompilerPlugin';
import indexHtmlWebpackPlugin from '../plugins/indexHtmlWebpackPlugin';
import copyWebpackPlugin from '../plugins/copyWebpackPlugin';
import circularDependencyPlugin from '../plugins/circularDependencyPlugin';
import miniCssExtractPlugin from '../plugins/miniCssExtractPlugin';
import htmlWebpackPlugin from '../plugins/htmlwebpack.plugin';
import contextReplacementPlugin from '../plugins/contextReplacementPlugin';
import bannerPlugin from '../plugins/bannerPlugin';

import HtmlWebpackExcludeAssetsPlugin from '../plugins/excludeAssetsPlugin';
import RemoveStyleOnly from '../plugins/removestyleonly';

const plugins = [
  htmlWebpackPlugin(),
  miniCssExtractPlugin,
  angularCompilerPlugin,
  new ProgressPlugin(),
  circularDependencyPlugin,
  copyWebpackPlugin,
  new HtmlWebpackExcludeAssetsPlugin(),
  // new RemoveStyleOnly(),
  new ForkTsCheckerWebpackPlugin(
    {
      memoryLimit: 512
    }
  ),
  bannerPlugin
];

plugins.concat(contextReplacementPlugin());
if (!dev_env) { plugins.concat([new SuppressExtractedTextChunksWebpackPlugin()]); }

export default plugins;