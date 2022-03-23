const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: "./src/index.js",

    plugins: [new HtmlWebpackPlugin({
        template: "./src/index.html",
        inject: "body"
    })],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }, 
            {
                test: /\.html$/,
                use: ["html-loader"]
            }
        ]
    }
}