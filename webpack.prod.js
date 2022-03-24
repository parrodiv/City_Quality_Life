const path = require("path");
const common = require("./webpack.common");
const {merge} = require("webpack-merge"); 
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: "production",
    "devtool": false,
    output: {
        filename: "main.[contenthash].bundle.js",
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "./imgs/[name].[hash].[ext]"
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