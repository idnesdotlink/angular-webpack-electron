import replaceInFile from 'replace-in-file';
import { join } from 'path';
import { src_path } from '../constants/paths';
const options = {
    files: `${join(src_path, 'try').toString()}/**/*.umd.js`,
    from: /\r/g,
    to: '\n',
};

async function rep() {
    try {
        const changes = await replaceInFile(options)
        console.log('Modified files:', changes.join(', '));
    }
    catch (error) {
        console.error('Error occurred:', error);
    }
}

rep();