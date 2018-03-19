var path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
  entry: {
    build: './src/components/Spring.js',
  }, 
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'vue-spring.js',
    library: 'vue-spring',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin()
  ]
}