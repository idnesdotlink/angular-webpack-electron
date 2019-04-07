import path from 'path';

// root
const root_path          = path.resolve(__dirname, '../..');
const src_path           = path.join(root_path, 'src');
const node_modules_path  = path.join(root_path, 'node_modules');
const dist_path          = path.join(root_path, 'dist');
const static_path        = path.join(root_path, 'static');

// src
const electron_src_path  = path.join(src_path, 'electron');
const web_src_path       = path.join(src_path, 'web');
const lib_src_path       = path.join(src_path, 'lib');
const art_src_path       = path.join(src_path, 'art');

// dist
const electron_dist_path = path.join(dist_path, 'electron');
const web_dist_path      = path.join(dist_path, 'www');
const art_dist_path      = path.join(dist_path, 'art');



export {
  electron_dist_path,
  node_modules_path,
  electron_src_path,
  art_dist_path,
  web_dist_path,
  art_src_path,
  lib_src_path,
  web_src_path,
  static_path,
  root_path,
  dist_path,
  src_path,
}
