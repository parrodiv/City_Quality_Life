const path = require("path");
const common = require("./webpack.common");
const {merge} = require("webpack-merge"); 

module.exports = merge(common, {
    mode: "development",
    "devtool": false,
    output: {
        filename: "main.bundle.js",
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "./imgs/[name].[ext]",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
})