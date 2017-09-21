var path = require("path");
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var stylesPath = path.resolve(__dirname, 'styles', 'styles.less');
var mainPath = path.resolve(__dirname, 'js', 'index.js');

module.exports = {
    entry: [mainPath, stylesPath],
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "http://localhost:3040/assets/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ["react", "es2015"]
                },
                exclude: [nodeModulesPath]
            },
            { 
                test: /\.less$/,
                loader: "style!css!autoprefixer!less"
            }, 
            {
                test: /\.json$/, 
                loader: 'json' 
            },
            { 
                test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/, 
                loader: 'url?limit=10000' 
            },
            {  
                test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
                loader: 'file' 
            }
        ]
    },
    devServer: {
        stats: 'errors-only',
    },
};
