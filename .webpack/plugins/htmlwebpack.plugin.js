import HtmlWebpackPlugin from 'html-webpack-plugin';
import { readFileSync } from 'fs';
import htmlClean from 'htmlclean';
import path from 'path';
import CleanCSS from 'clean-css';

import { dev_env, web_env } from '../constants/environments';
import { web_src_path, art_src_path } from '../constants/paths';

const config = {
  title: 'Autodrive',
  placeholder: path.join(art_src_path, 'placeholder2.svg'),
  inlineStyle: path.join(web_src_path, 'styles', 'inline.css'),
  color: '#db5945'
}

const htmlwebpack = function () {
  let title = dev_env ? `${config.title} : Development Server` : config.title;
  let placeholder = htmlClean(readFileSync(config.placeholder).toString());
  let basehref = web_env ? '/' : '/';
  let meta = {
    'viewport': 'width=device-width, initial-scale=1.0, user-scalable=no',
    'theme-color': config.color
  };
  let filename = 'index.html';
  let template = path.join(web_src_path, 'main.ejs');

  let excludeAssets = [/(worker|worker2|themes|fonts)\.js$/];

  // minify options here
  let minify = {
    collapseWhitespace: !dev_env,
    removeAttributeQuotes: !dev_env,
    removeComments: !dev_env
  };

  let chunksSortMode = 'none';

  let inlineStyle = new CleanCSS().minify(readFileSync(config.inlineStyle).toString()).styles;
  inlineStyle = `<style>${inlineStyle}</style>`;

  const options = {
    title,
    filename,
    template,
    meta,
    placeholder,
    minify,
    basehref,
    chunksSortMode,
    inlineStyle,
    excludeAssets
  };

  return new HtmlWebpackPlugin(options);
}
export default htmlwebpack;
