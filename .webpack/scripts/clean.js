import del from 'del';
import ora from 'ora';
import { clean_env } from '../constants/environments'

async function clean() {
  await del(['dist/www/*', '!.gitkeep']);
  await del(['dist/electron/*', '!.gitkeep']);
  await del(['dist/out-tsc/**/*', 'dist/out-tsc/*', '!.gitkeep']);
  // icons
  await del(['build/**/*', 'build/*', 'build/.icon-set', '!build/icons', '!.gitkeep']);
}

async function with_spinner () {
  let spinner = ora();
  spinner.start();
  try {
    await clean();
    spinner.succeed('clean success !!');
  } catch (error) {
    spinner.fail(error);
  } finally {
    if (spinner && spinner.stop) {
      spinner.stop();
      spinner = null;
    }
    process.exit();
  }
}

if( clean_env) { with_spinner() };

export { clean };