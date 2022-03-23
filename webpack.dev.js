
const path = require("path");

module.exports = {
    mode: "development",
    "devtool": false,
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },
}