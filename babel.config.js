/**
 * Babel 配置
 *
 * @see https://babeljs.io/docs/en/options
 * @param {import("@babel/core").ConfigAPI} api
 * @returns {import("@babel/core").TransformOptions}
 */
module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['react-app'],
    plugins: ['@emotion'],
  };
};
