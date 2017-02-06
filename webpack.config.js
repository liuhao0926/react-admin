const path = require('path');
const webpack = require('webpack');
const args = require('yargs').argv;
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const WriteFilePlugin = require('write-file-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const distPath = path.resolve(__dirname, 'dist');
const nodeModulesPath = path.join(__dirname, 'node_modules');
const isProduct = args.prod;
const isMock = args.mock;

const host = '0.0.0.0';
const port = '8181';

// const CLIENT_ID = JSON.stringify('1091d9c4cd3346bda23ef2863a4d68b7');
// const CLIENT_SECRET = JSON.stringify('jPsWrDtf0q-yHfZzEjJsQ30LHAmNaSdAQS9nnlNxoJY');
const API_HOST = JSON.stringify('//dev.feiniubus.com:7030/api');
// const PAY_API_HOST = JSON.stringify('//dev.feiniubus.com:8081/api');

const deps = [
    'react-redux/dist/react-redux.min.js',
    'react-router/umd/ReactRouter.min.js',
    'whatwg-fetch/fetch.js',
    // 'babel-polyfill/browser.js',
];
const webpackPluginCommonConfig = [
    new webpack.DefinePlugin({
        __PROD__: isProduct, 
        __MOCK__: isMock,
        // __CLIENT_ID__: CLIENT_ID,
        // __CLIENT_SECRET__: CLIENT_SECRET,
        API: API_HOST
        // PAY_API: PAY_API_HOST
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: isProduct ? 'assets/vendor/vendor.[hash:8].js' : 'vendor.js',
        minChunks: Infinity
    }),    
    new ExtractTextPlugin(isProduct ? 'assets/vendor/[name].[hash:8].css' : '[name].css'),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
        favicon: './src/favicon.ico',
        chunks: ['app', 'vendor'],
        title: 'React Admin',
        devServer: isMock
    }),    
    new webpack.ResolverPlugin([
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('package.json', ['main'])
    ]),
    new webpack.ProvidePlugin({
        React: "react",
        ReactDOM: "react-dom"
    })
];
if(isProduct) {
    const plugins = [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            comments: false,
            compress: {
                warnings: false,
                drop_console: true
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ];
    webpackPluginCommonConfig.push(...plugins);
};
const configure = {
   entry: {
        app: [path.resolve(__dirname, 'src')],
        vendor: [
            'ui.less',
            'babel-polyfill',
            'react',
            'react-dom',
            'react-router',
            'whatwg-fetch'
        ]
    },
    output: {
        path: distPath,
        filename: isProduct ? 'assets/vendor/[name].[hash:8].js' : '[name].js',
        chunkFilename: isProduct ? 'assets/js/[name].[hash:8].chunk.js' : '[name].chunk.js'
    },
    resolve: {
        root: path.resolve('node_modules'),
        modulesDirectories: ['node_modules'],
        extensions: [
            '',
            '.web.tsx',
            '.web.ts',
            '.web.jsx',
            '.web.js',
            '.jsx',
            '.js',
            '.json',
            '.less'
        ],
        alias: {
            components: path.join(__dirname, 'src/components'),
            actions: path.join(__dirname, 'src/core/actions'),
            config: path.join(__dirname, 'src/core/config'),
            reducers: path.join(__dirname, 'src/core/reducers'),
            pages: path.join(__dirname, 'src/pages'),
            store: path.join(__dirname, 'src/core/store'),
            utils: path.join(__dirname, 'src/utils'),
            UI: 'antd',
            'ui.less': path.join(__dirname, 'src/styles')
        }        
    },
    cache: true,
    module: {
         noParse: [],
         loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader', 'eslint-loader'],
                exclude: /(node_modules)/
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css!postcss!less')
            }, {
                test: /\.json$/,
                loaders: ['json-loader']
            }, {
                test: /\.(woff|woff2|ttf|eot)(\?]?.*)?$/,
                loader: 'url-loader?limit=1&name=/assets/fonts/[name].[ext]?[hash:8]'
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader?limit=8192&name=/assets/images/[name].[hash:8].[ext]'
            }
        ],
        htmlLoader: {
            ignoreCustomFragments: [/\{\{.*?}}/]
        }
    },
    plugins: webpackPluginCommonConfig,
    debug: isMock,
    devtool: isProduct ? null : 'source-map',
    devServer: {
        contentBase: distPath,
        outputPath: path.join(__dirname, './dist'),
        historyApiFallback: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        clientLogLevel: 'error',
        quiet: true,
        noInfo: true,
        hot: true,
        inline: true,
        stats: {
            modules: false,
            cached: false,
            colors: true,
            chunk: false
        },
        host,
        port
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },    
    postcss() {
        return [
            autoprefixer,
            pxtorem({
                rootValue: 100,
                propWhiteList: [],
                selectorBlackList: [/^html$/, /^\.ant-/, /^\.github-/, /^\.gh-/]
            })
        ];
    }    
};

if (isMock) {
    let hotLoader = [
        `webpack-dev-server/client?http://${host}:${port}`, 
        'webpack/hot/only-dev-server'
    ];
    hotLoader = hotLoader.concat(...configure.entry.app);
    configure.entry.app = hotLoader;
    webpackPluginCommonConfig.push(
        new webpack.HotModuleReplacementPlugin(),
        new WriteFilePlugin({
            log: false
        })
    );
};

deps.forEach(dep => {
    const depPath = path.resolve('node_modules', dep);
    configure.resolve.alias[dep.split(path.sep)[0]] = depPath;
});
Object.keys(configure.resolve.alias).forEach(key => {
    configure.module.noParse.push(key);
});

module.exports = configure;
