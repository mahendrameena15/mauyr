const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;
const { ordersUrl } = require("../config");
const Dotenv = require("dotenv-webpack");

module.exports = (_, argv) => ({
  output: {
    publicPath: `${ordersUrl}/`,
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3003,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "orders",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./SupplierOrderManagement":
          "./src/components/orders/SupplierOrderManagement.jsx",
        "./OrderListing": "./src/components/orderListing/OrderListing.jsx",
        "./SupplierSetting": "./src/components/settings/SupplierSetting.jsx",

        "./NewOrder": "./src/notification/NewOrder.jsx",
        "./PaidOrder": "./src/notification/PaidOrder.jsx",
        "./OrderUpdate": "./src/notification/OrderUpdate.jsx",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new Dotenv(), // Load environment variables from .env
  ],
});
