import { AngularWebpackPlugin, AngularWebpackPluginOptions } from '@ngtools/webpack';
import * as path from "path";
import { Configuration } from 'webpack';

const func = (config: Configuration, options: any, targetOptions: any) => {
  config.module?.rules?.push(
    {
      test: /\.html$/,
      loader: path.resolve('./custom-webpack-loader.js')

    },
  );

  const angularWebpackPlugin: any = config.plugins?.find((p: any) => p instanceof AngularWebpackPlugin);
  if (angularWebpackPlugin) {
    (angularWebpackPlugin.pluginOptions as AngularWebpackPluginOptions).directTemplateLoading = false;
  }
  return config;
};

export default func;

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
