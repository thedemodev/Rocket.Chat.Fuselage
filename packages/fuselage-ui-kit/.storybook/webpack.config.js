'use strict';

const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');

const { EnvironmentPlugin } = require('webpack');

module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /\.mdx$/,
    use: [
      'babel-loader',
      {
        loader: '@mdx-js/loader',
        options: {
          compilers: [createCompiler({})],
        },
      },
    ],
  });

  config.module.rules.push({
    test: /(stories|story)\.js$/,
    loader: require.resolve('@storybook/source-loader'),
    exclude: [/node_modules/],
    enforce: 'pre',
  });

  config.plugins.push(new EnvironmentPlugin(['NODE_ENV']));

  return config;
};
