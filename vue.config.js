const path = require("path");
const webpack = require("webpack");

module.exports = {
  // publicPath: '/app/v1/scl', 
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"), 
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(true), // Abilita l'Options API
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false), // Disabilita i DevTools in produzione
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false), // Disabilita dettagli idratazione (da mettere true se poi voglio debugging di vue con SSR)
      }),
    ],
  },
};
