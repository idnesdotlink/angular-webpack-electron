const path = require('path');
const fs = require('fs');
import HtmlWebpackPlugin from 'html-webpack-plugin';

class HtmlWebpackExcludeEmptyAssetsPlugin {

  constructor() {
    this.PluginName = 'excludeEmpty';
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(this.PluginName,
      (compilation) => {
        HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync(
          this.PluginName,
          (htmlPluginData, callback) => {
            const result = this.processAssets(htmlPluginData, compilation);
            if (callback) {
              callback(null, result);
            } else {
              return Promise.resolve(result);
            }
          }
        );
      }
    );
  }

  processAssets(pluginData, compilation) {
    // const base = JSON.parse(pluginData.plugin.assetJson)[0];
    // const filterTag = tag =>
    //     !['link', 'script'].includes(tag.tagName) ||
    //     !Boolean(tag.attributes) ||
    //     !this.isEmpty(tag.attributes.src || tag.attributes.href, base, compilation);

    // return {
    //   head: pluginData.head.filter(filterTag),
    //   body: pluginData.body.filter(filterTag),
    //   plugin: pluginData.plugin,
    //   chunks: pluginData.chunks,
    //   outputName: pluginData.outputName
    // };
    return pluginData;
  }

  isEmpty(assetPath, base, compilation) {
    const rel = assetPath.substr(base.length);
    const source = compilation.assets[rel];
    if (source && source.size) {
      return source.size() === 0;
    }
    return false;
  }
}

export default HtmlWebpackExcludeEmptyAssetsPlugin;