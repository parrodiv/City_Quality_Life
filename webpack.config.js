const HtmlWebpackPlugin = require("html-webpack-plugin");
const { dirname } = require("path");
const path = require("path");

module.exports = {
    mode: "development",
    "devtool": false,
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },
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
        ]
    }
}