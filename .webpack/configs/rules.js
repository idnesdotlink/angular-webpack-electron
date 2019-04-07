import Fiber from 'fibers';
import sass from 'sass';
import { join } from 'path';
import { web_src_path, node_modules_path, src_path } from '../constants/paths';
import { dev_env } from '../constants/environments';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import dir_name from './dir_name'

const fileLoaderOptions = {
  limit: 10000,
  useRelativePath: true,
  name: '[name].[ext]'
};

if (dir_name !== false) {
  fileLoaderOptions['outputPath'] = `${dir_name}/`;
  fileLoaderOptions['publicPath'] = `../${dir_name}/`;
}

const dev = [
  {
    test: /\.ts$/,
    include: [join(src_path, 'worker')],
    use: [
      {
        loader: 'worker-loader',
        options: {
          name: (!dir_name) ? '[name].worker.js' : `${dir_name}/[name].worker.js`,
        }
      },
      { loader: 'ts-loader', options: {
        transpileOnly: true,
        experimentalWatchApi: true,
      } }]
  },
  {
    test: /\.ts$/,
    include: [join(web_src_path, 'app', 'core', 'data')],
    use: [
      { loader: 'ts-loader', options: {
        transpileOnly: true,
        experimentalWatchApi: true,
      } }]
  },
  {
    test: /\.ts$/,
    exclude: [
      join(src_path, 'worker'),
      join(web_src_path, 'app', 'core', 'data')
    ],
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
  },
  {
    test: /[\/\\].+\.(scss|sass)$/,
    use: [
      MiniCssExtractPlugin.loader,
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
    include: [join(web_src_path, 'styles', 'themes.scss')]
  },
  {
    test: /\.(eot|svg|cur)$/,
    loader: 'file-loader',
    options: fileLoaderOptions
  },
  {
    test: /\.(jpg|png|webp|gif)$/,
    loader: 'file-loader',
    options: fileLoaderOptions
  },
  {
    test: /\.(svg|cur|eot|otf|ttf|woff|woff2|ani)$/,
    loader: 'file-loader',
    options: fileLoaderOptions
  },
  {
    test: /(typeface-(roboto|open-sans)[\/\\]index|material-icons)\.css$/,
    include: [node_modules_path],
    loader: 'file-loader',
    options: fileLoaderOptions,
  },
  {
    test: /(typeface-(roboto|open-sans)[\/\\]index|material-icons)\.css$/,
    include: [node_modules_path],
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          importLoaders: 1
        }
      }
    ],
  },
  {
    test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
    parser: { system: true },
  }
];

const prod = [
  {
    test: /\.ts$/,
    include: join(src_path, 'worker'),
    use: [
      {
        loader: 'worker-loader',
        options: {
          name: (!dir_name) ? '[name].worker.js' : `${dir_name}/[name].worker.js`,
        }
      },
      { loader: 'ts-loader', options: {
        transpileOnly: true,
        experimentalWatchApi: true,
      } }
    ]
  },
  {
    test: /\.ts$/,
    include: [join(web_src_path, 'app', 'core', 'data')],
    use: [
      { loader: 'ts-loader', options: {
        transpileOnly: true,
        experimentalWatchApi: true,
      } }]
  },
  {
    test: /\.ts$/,
    exclude: [
      join(src_path, 'worker'),
      join(web_src_path, 'app', 'core', 'data')
    ],
    use: '@ngtools/webpack'
  },
  {
    test: /\.js$/,
    loader: '@angular-devkit/build-optimizer/webpack-loader',
    options: { sourceMap: true }
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
  },
  {
    test: /[\/\\].+\.(scss|sass)$/,
    use: [
      MiniCssExtractPlugin.loader,
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
    include: [join(web_src_path, 'styles', 'themes.scss')]
  },
  {
    test: /(typeface-(roboto|open-sans)[\/\\]index|material-icons)\.css$/,
    include: [node_modules_path],
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          importLoaders: 1
        }
      }
    ],
  },
  {
    test: /\.(jpg|png|webp|gif)$/,
    loader: 'file-loader',
    options: fileLoaderOptions
  },
  {
    test: /\.(svg|cur|eot|otf|ttf|woff|woff2|ani)$/,
    loader: 'file-loader',
    options: fileLoaderOptions
  },
  {
    test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
    parser: { system: true },
  }
];

const rules = dev_env ? dev : prod;

export default rules;