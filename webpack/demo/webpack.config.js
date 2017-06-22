module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
    ]
  }
};
// module.exports = {
//   entry: './main.js',
//   output: {
//     filename: 'bundle.js'
//   }
// };
// module: {
//   loaders: [
//     {
//       test: /\.jsx?$/,
//       exclude: /node_modules/,
//       loader: 'babel-loader',
//       query: {
//         presets: ['es2015', 'react']
//       }
//     }
//   ]
// }