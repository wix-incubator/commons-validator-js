module.exports = {
    entry: [
        './index'
    ],
    output: {
        path: 'dist/',
        filename: 'index.js',
        libraryTarget: 'commonjs',
    },
    externals: ['lodash', 'punycode'],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel'
            }
        ]
    }
}
