define(["require", "exports", "@ngtools/webpack", "path"], function (require, exports, webpack_1, path) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const func = (config, options, targetOptions) => {
        config.module?.rules?.push({
            test: /\.html$/,
            loader: path.resolve('./custom-webpack-loader.js')
        });
        const angularWebpackPlugin = config.plugins?.find((p) => p instanceof webpack_1.AngularWebpackPlugin);
        if (angularWebpackPlugin) {
            angularWebpackPlugin.pluginOptions.directTemplateLoading = false;
        }
        return config;
    };
    exports.default = func;
});
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
