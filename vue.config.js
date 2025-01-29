const { defineConfig } = require('@vue/cli-service');
const path = require("path");
// const webpack = require("webpack");

module.exports = defineConfig({
  publicPath: '/app/v1/scl',  // Percorso base per il deploy
  transpileDependencies: true,  // Mantiene la configurazione originale

  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"), // Alias per la cartella src
      },
    },
  },
 
});
