import { node_modules_path } from '../constants/paths';
import { loader } from 'mini-css-extract-plugin';

const typefaces = [
  {
    test: /\.(svg|eot|otf|ttf|woff|woff2)$/,
    include: [node_modules_path],
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
      loader,
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          importLoaders: 1
        }
      }
    ],
  }
];

export { typefaces };