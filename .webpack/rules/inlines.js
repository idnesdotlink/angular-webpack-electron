import Fiber from 'fibers';
import sass from 'sass';
import { join } from 'path';
import { web_src_path } from '../constants/paths';
import { loader } from 'mini-css-extract-plugin';

const inlines = {
  test: /[\/\\].+\.(scss|sass)$/,
  use: [
    loader,
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        importLoaders: 1
      }
    },
    {
      loader: 'sass-loader',
      options: {
        implementation: sass,
        fibers: Fiber,
        sourceMap: true,
        includePaths: [
          node_modules_path
        ]
      }
    }
  ],
  include: [join(web_src_path, 'styles', 'inlines.scss')]
};

export { inlines }