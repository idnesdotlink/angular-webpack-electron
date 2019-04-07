import webpack from 'webpack';
import { web_src_path } from '../constants/paths';
export default () => {
  return [
    new webpack.ContextReplacementPlugin(
    // The (\\|\/) piece accounts for path separators in *nix and Windows
    /@angular(\\|\/)core(\\|\/)(@angular|fesm5|esm5)/,
    web_src_path,
    {} // a map of your routes
  ),
  new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|id/),
  ];
}