const path = require("path");
const common = require("./webpack.common");
const {merge} = require("webpack-merge"); 
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    "devtool": false,
    output: {
        filename: "[name].[contenthash].bundle.js", //può essere file main o vendor, per questo si inserisce la variabile name
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "./imgs/[name].[hash].[ext]"
    },
    optimization: {
        minimizer: [
          new CssMinimizerPlugin(), new TerserPlugin()
          //terser plugin minimizza javascript, ma il css minimizer ha sovrascritto il minimizer javascript, pertanto lo inserisco dopo il cssMinimizer
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({filename:"[name].[contenthash].css"}),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/, 
                use: [MiniCssExtractPlugin.loader, "css-loader"] 
                //MiniCssExtractPlugin estrae i file css e li include nel dom, non più nel index.js, questo velocizza il caricamento dello stile in production
            }
        ]
    }
});