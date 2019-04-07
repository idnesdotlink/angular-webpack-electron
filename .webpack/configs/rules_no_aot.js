import Fiber from 'fibers';
import sass from 'sass';
import { join } from 'path';
import { web_src_path, node_modules_path } from '../constants/paths';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const rules = [
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
          sourceMap: true
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
          sourceMap: true
        }
      }
    ],
    include: [join(web_src_path, 'styles', 'themes.scss')]
  },
  {
    test: /\.(eot|svg|cur)$/,
    loader: 'file-loader',
    options: {
      name: `[name].[ext]`,
      limit: 10000
    }
  },
  {
    test: /\.(jpg|png|webp|gif)$/,
    loader: 'url-loader',
    options: {
      name: `[name].[ext]`,
      limit: 10000
    }
  },
  {
    test: /\.(svg|cur|eot|otf|ttf|woff|woff2|ani)$/,
    loader: 'file-loader',
    options: {
      name: `[name].[ext]`,
      limit: 10000
    }
  },
  {
    test: /(typeface-(roboto|open-sans)[\/\\]index|material-icons)\.css$/,
    include: [node_modules_path],
    loader: 'file-loader',
    options: {
      name: `[name].[ext]`,
      limit: 10000
    },
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
    test: /\.ts$/,
    use: [
      {
        loader: 'ts-loader'
      },
      'angular2-template-loader'
    ]
  },
  {
    test: /\.(ts|js)$/,
    loaders: [
      'angular-router-loader'
    ]
  },
  {
    test: /\.html$/,
    use: [
      {
        loader: 'html-loader'
      }
    ]
  },
  {
    test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
    parser: { system: true },
  }
];

export default rules;