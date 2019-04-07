import webpack from 'webpack';
import ora from 'ora';

import config from '../configs/config';
import { clean } from './clean';
// let spinner = ora();

function build(config) {
  return new Promise(
    (resolve, reject) => {
      webpack(
        config,
        (err, stats) => {
          // has error reject
          if (err) reject(err.stack || err)

          // stat has error
          else if (stats.hasErrors()) {
            let err = '';
            stats.toString({ chunks: false, colors: true })
              .split(/\r?\n/)
              .forEach(line => { err += `    ${line}\n`; })
            reject(err);

          // no error resolve
          } else {
            resolve(stats.toString({ chunks: false, colors: true }));
          }
        }
      );
    }
  );
}

Promise.all(
  [
    // spinner.start('Build'),
    clean(),
    build(config)
  ]
)
  .then(
    (value) => {
      // spinner.succeed('Build Success');
      process.exit()
    },
    (error) => {
      // spinner.fail('Build Failed');
      console.error(`\n${error}\n`)
      process.exit(1)
    }
  )
  .finally(() => {
    // if (spinner.stop && spinner.stop()) spinner = null;
  });
