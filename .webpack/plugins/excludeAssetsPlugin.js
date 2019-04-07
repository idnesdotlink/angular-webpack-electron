'use strict';
var assert = require('assert');
import HtmlWebpackPlugin from 'html-webpack-plugin';

class HtmlWebpackExcludeAssetsPlugin {

  constructor(options) {
    assert.equal(options, undefined, 'The HtmlWebpackExcludeAssetsPlugin does not accept any options');
    this.PluginName = 'HtmlWebpackExcludeAssetsPlugin';
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(this.PluginName,
      (compilation) => {
        HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync(
          this.PluginName,
          (htmlPluginData, callback) => {

            // const x = JSON.parse(htmlPluginData.plugin.assetJson)[0];
            // console.log(`------------------`);
            // const assetJson = JSON.parse(htmlPluginData.plugin.assetJson);
            // assetJson.forEach(
            //   (item) => {
            //     const source = compilation.assets[item];
            //     if(source && source.size) {
            //       console.log(source.size());
            //     }
            //   }
            // );
            // // console.log(compilation.assets);
            // console.log(`------------------`);

            var excludeAssets = htmlPluginData.plugin.options.excludeAssets;
            var excludePatterns = excludeAssets.filter((excludePattern) => {
              return excludePattern.constructor === RegExp;
            });
            var isExcluded = (assetPath) => {
              // compilation
              return excludePatterns.filter((excludePattern) => {
                return excludePattern.test(assetPath);
              }).length > 0;
            };
            const scripts = [];
            htmlPluginData.assetTags.styles.forEach(function (tag) {
              if (isExcluded(tag.attributes.href)) console.log(tag.attributes.href);
            });
            htmlPluginData.assetTags.scripts.forEach(function (tag) {
              // if ('pub/worker.js' === tag.attributes.src) console.log(tag.attributes.src);
              if (!isExcluded(tag.attributes.src)) {
                // console.log(`-------------------${tag.attributes.src}`);
                scripts.push(tag);
              }
            });
            htmlPluginData.assetTags.scripts = scripts;
            callback(null, htmlPluginData);


            /* console.log(htmlPluginData.plugin.options);
            // Skip if the plugin configuration didn't set `excludeAssets`
            if (!excludeAssets) {
              if (callback) {
                return callback(null, htmlPluginData);
              } else {
                return Promise.resolve(htmlPluginData);
              }
            }

            if (excludeAssets.constructor !== Array) {
              excludeAssets = [excludeAssets];
            }

            // Skip invalid RegExp patterns
            var excludePatterns = excludeAssets.filter(function (excludePattern) {
              return excludePattern.constructor === RegExp;
            });

            var result = self.processAssets(excludePatterns, htmlPluginData);
            if (callback) {
              callback(null, result);
            } else {
              return Promise.resolve(result);
            } */
          }
        );
      }
    );
  }

  isExcluded(excludePatterns, assetPath) {

  }

  processAssets() {

  }
}

export default HtmlWebpackExcludeAssetsPlugin;