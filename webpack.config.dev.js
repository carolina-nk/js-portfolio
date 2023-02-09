const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin"); //HTML
const MiniCSSExtractPlugin = require("mini-css-extract-plugin"); //CSS
const Dotenv = require("dotenv-webpack"); //variables de entorno

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "assets/[name].[contenthash].js",
        assetModuleFilename: "assets/images/[hash][ext][query]",
        clean: true
    },
    resolve: {
        extensions: [".js"],
        alias: {
            "@utils": path.resolve(__dirname,"src/utils/"),
            "@templates": path.resolve(__dirname,"src/templates/"),
            "@styles": path.resolve(__dirname,"src/styles/"),
            "@images": path.resolve(__dirname,"src/assets/images/")
        }
    },
    module: {
        rules: [
            {
                // Test declara que extensión de archivos aplicara el loader
                test: /\.m?js$/,
                // Exclude permite omitir archivos o carpetas especificas
                exclude: /node_modules/,
                // Use es un arreglo u objeto donde dices que loader aplicaras
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css|.styl$/i,
                use: [MiniCSSExtractPlugin.loader,
                    "css-loader",
                    "stylus-loader"
                ]
            },
            {
                test: /\.png/,
                type: "asset/resource"
            },
            {
                test: /\.(woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name].[contenthash].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            inject: true,
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new MiniCSSExtractPlugin({
            filename: "assets/[name].[contenthash].css"
        }),
        new Dotenv(),
    ]
}