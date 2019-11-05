const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: {
        main: './src/main.js',
    },
    output: {
        filename: './dist/[name].js',
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        sourcePrefix: '', // removes tabs before multiline strings,
    },
    devtool: 'source-map',
    plugins: [
        new Dotenv(),
    ],
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
    },
    module: { // Pour la transpilation
        rules: [
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],

            },
            {
                test: /\.css$/,
                include: /node_modules/,
                loaders: ['style-loader', 'css-loader'],
            },
            {
                test: /\.png$/,
                loader: 'url-loader?limit=100000',
            },
            {
                test: /\.jsx?$/, // Fichier à compiler
                exclude: /(node_module)/,
                loader: 'babel-loader', // Permet de transpiler
                query: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ['@babel/plugin-proposal-class-properties'],
                    retainLines: true,
                },
            }],

    },
    devServer: {
        disableHostCheck: true,
        historyApiFallback: true,
        hot: true,
        port: 3000,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
        },
        stats: 'errors-only',
        proxy: {
            '/v1/api/**': {
                logLevel: 'debug',
                target: 'http://localhost:8080',
                secure: false,
                changeOrigin: true,
            },
        },

    },
};
