const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.tsx", // entry for the dynamic loader (index.js)
    "plant-tree-widget": "./src/PlantTreeWidget.tsx",
    "buy-star-widget": "./src/BuyStarWidget.tsx",
    // add other widget entry points as needed, e.g.:
    // "test-widget": "./src/TestWidget.tsx"
  },
  output: {
    filename: "[name].js", // creates a separate file for each entry, e.g., plant-tree-widget.js
    path: path.resolve(__dirname, "dist"),
    library: "[name]", // dynamically set the library name based on the entry name
    libraryTarget: "umd",
    libraryExport: "default",
    umdNamedDefine: true,
    globalObject: "this", // Ensure compatibility with browsers
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },

  plugins: [
    new CleanWebpackPlugin(), // Cleans the dist folder before each build
  ],
  mode: "production",
  devtool: "source-map",
};
