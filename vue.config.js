const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "./docs", //build 결과물을 docs라는 폴더에 저장
  publicPath: "./",
  assetsDir: "./",
});
