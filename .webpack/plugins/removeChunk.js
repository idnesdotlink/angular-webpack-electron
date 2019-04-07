import minimatch from 'minimatch';

export default class MiniCssExtractPluginCleanup {
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      'MiniCssExtractPluginCleanup',
      (compilation, callback) => {
        Object.keys(compilation.assets).forEach(
          asset => {
            if(asset === 'fonts.js') {
              console.log({'ASSET': asset})
              // delete compilation.assets[asset]
            }
          }
        )
        callback();
      }
    );
  }
}
