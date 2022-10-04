const {AngularWebpackPlugin} = require('@ngtools/webpack/src/ivy/plugin');
const path = require('path');

// TODO use Typescript

module.exports = (config, options, targetOptions) => {
  config.module.rules.push(
    {
      test: /\.html$/,
      loader: path.resolve('./custom-webpack-loader.js')
    },
  );

  const angularWebpackPlugin = config.plugins.find(p => p instanceof AngularWebpackPlugin);
  if (angularWebpackPlugin) {
    angularWebpackPlugin.pluginOptions.directTemplateLoading = false;
  }
  return config;
};

/*
References:
https://github.com/just-jeb/angular-builders/issues/989
https://github.com/just-jeb/angular-builders/issues/465#issuecomment-554388234
https://github.com/just-jeb/angular-builders/issues/842#issuecomment-764573237
https://github.com/just-jeb/angular-builders/issues/1201#issuecomment-1119187324

Got it working with:
> getting angularWebpackPlugin
directTemplateLoading = false
> Watch out for the cache!
Must edit a component.html or the loader function first
 */
