import { join } from 'path';
import { web_src_path, lib_src_path, src_path } from '../constants/paths';
import rxPaths from 'rxjs/_esm5/path-mapping';
const alias = {
  ... rxPaths(),
  '@lib': lib_src_path,
  '@extra': join(web_src_path, 'app', 'extra'),
  '@core': join(web_src_path, 'app', 'core'),
  '@shared': join(web_src_path, 'app', 'shared'),
  '@screen': join(web_src_path, 'app', 'screen'),
  '@worker': join(src_path, 'worker'),
  '@lazy': join(src_path, 'lazy'),
};
export default alias;