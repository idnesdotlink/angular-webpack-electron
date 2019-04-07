import { CleanCssWebpackPlugin } from '@angular-devkit/build-angular/src/angular-cli-files/plugins/cleancss-webpack-plugin';
import { HashedModuleIdsPlugin } from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import cssnano from 'cssnano';

const optimization = {
  noEmitOnErrors: true,
  removeEmptyChunks: true,
  removeAvailableModules: true,
  runtimeChunk: 'single',
  splitChunks: {
    cacheGroups: {
      vendors: {
        chunks: 'async',
        enforce: true,
        test: /[\\/]node_modules[\\/]/,
        priority: -10
      },
      lib: {
        name: 'lib',
        chunks: 'async',
        test: /[\\/]src[\\/]lib[\\/]/,
        minChunks: 2,
        enforce: true,
        priority: 5
      },
      default: {
        chunks: 'async',
        minChunks: 2,
        priority: 10
      },
      common: {
        name: 'common',
        chunks: 'async',
        minChunks: 2,
        enforce: true,
        priority: 5
      },
      // vendors: false,
      // vendor: false
    }
  },
  minimizer: [
    new HashedModuleIdsPlugin(),
    new TerserPlugin(
      {
        sourceMap: false,
        cache: true,
        parallel: true,
        terserOptions: {
          safari10: true,
          output: {
            ascii_only: true,
            comments: false,
            webkit: true,
          },
          compress: {
            pure_getters: true,
            passes: 3,
            inline: 3,
          }
        }
      }
    ),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
      cssProcessorPluginOptions: {
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true
            },
            normalizeUrl: false
          }
        ],
      },
      canPrint: true
    }),
    new CleanCssWebpackPlugin({
      sourceMap: false,
      test: (file) => /\.(?:css)$/.test(file),
    })
  ]
};

export default optimization;