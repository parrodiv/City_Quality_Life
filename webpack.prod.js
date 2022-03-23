
const path = require("path");

module.exports = {
    mode: "production",
    "devtool": false,
    output: {
        filename: "main.[contenthash].js",
        path: path.resolve(__dirname, "dist")
    },
    
}