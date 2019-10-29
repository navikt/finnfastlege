const path = require('path');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const mainPath = path.resolve(__dirname, 'src', 'app', 'js', 'index.js');
const stylesPath = path.resolve(
    __dirname,
    'src',
    'app',
    'styles',
    'styles.less'
);

module.exports = {
    entry: [mainPath, stylesPath],
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: 'http://localhost:3040/assets/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                },
                exclude: [nodeModulesPath]
            },
            {
                test: /\.less$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'less-loader?{"globalVars":{"nodeModulesPath":"\'~\'", "coreModulePath":"\'~\'"}}'
                ]
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
        stats: 'errors-only'
    }
};
