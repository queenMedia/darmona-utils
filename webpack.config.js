const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "index.js",
    globalObject: "this",
    path: path.resolve(__dirname, "dist"),
    // path: path.resolve(
    //   __dirname,
    //   "../darmona-new/node_modules/darmona-utils/dist"
    // ),
    library: {
      name: "darmona-utils",
      type: "umd",
    },
  },
};
