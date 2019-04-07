
import Fiber from 'fibers';
import sass from 'sass';
import { join } from 'path';
import { web_src_path } from '../constants/paths';
const angular_app =[
  {
    test: /\.ts$/,
    use: '@ngtools/webpack'
  },
  {
    test: /\.js$/,
    exclude: /(ngfactory|ngstyle).js$/,
    enforce: 'pre',
    use: 'source-map-loader'
  },
  {
    test: /\.html$/,
    use: [{ loader: 'html-loader' }]
  },
  {
    test: /[\/\\].+\.(scss|sass)$/,
    use: [
      'to-string-loader',
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
    exclude: [join(web_src_path, 'styles', 'themes.scss')]
  }
];

export { angular_app }