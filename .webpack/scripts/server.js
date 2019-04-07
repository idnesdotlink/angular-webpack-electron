import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { web_dist_path } from '../constants/paths';
import config from '../configs/config';
import Promise from 'bluebird';

async function server() {
  return new Promise(
    (resolve, reject) => {

      const options = {
        hot: true,
        inline: true,
        host: '0.0.0.0',
        port: 9080,
        disableHostCheck: true,
        contentBase: web_dist_path,
        // publicPath: '/output/',
        historyApiFallback: true,
        allowedHosts: ['127.0.0.1, localhost', '0.0.0.0']
      };

      WebpackDevServer.addDevServerEntrypoints(config, options);
      const compiler = webpack(config);
      const hm = webpackHotMiddleware(compiler, {
        log: false,
        heartbeat: 2500
      });

      options.before = (app, ctx) => {
        ctx.middleware.waitUntilValid(() => {
          app.use(hm);
          resolve();
        })
      };

      /* compiler.hooks.compilation.tap('ejs-reload', (compilation) => {
        HtmlWebpackPlugin.getHooks(compilation).afterEmit.tapAsync(
          'ejs-reload',
          (data, cb) => {
            hm.publish({ action: 'reload' })
            cb();
          }
        )
      }) */

      const server = new WebpackDevServer(compiler, options);

      server.listen(9080, 'localhost', () => {
        // let message = `dev server listening on port: ${9080}`;
        // console.log(message);
      });

    }
  )
}

const init = async function dev() {
  try {
    await server();
  } catch (error) {
    console.log(error)
  }
}

init();
