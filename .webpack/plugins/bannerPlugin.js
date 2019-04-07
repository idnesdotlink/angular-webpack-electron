import webpack from 'webpack';
const banner = new webpack.BannerPlugin(
  {
    banner: `importScripts('./runtime.js');`,
    raw: true,
    entryOnly: true,
    test: /\.worker\.js$/
  }
);
export default banner;