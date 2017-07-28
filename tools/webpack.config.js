import path from 'path';
import webpack from 'webpack';


const NODE_ENV = process.env.NODE_ENV || 'development'

const __DEV__ = NODE_ENV === 'development'
const __TEST__ = NODE_ENV === 'test'
const __PROD__ = NODE_ENV === 'production'


const pthRoot = path.resolve(__dirname, '..');
const pthSrc = path.join(pthRoot, 'src');
const pthDst = path.join(pthRoot, 'dist', 'server');
const pthCDN = path.join(pthDst, 'static');


const cfgLoaderBabel = {
  loader: 'babel-loader',
  options: {
    babelrc: false,
    presets: [
      "stage-0",
      "react"
    ],
  }
};

function loaderBabel(opts = {}) {
  const cfg = {
    test: /\.js$/,
    // exclude: /(node_modules|bower_components)/,
    use: JSON.parse(JSON.stringify(cfgLoaderBabel))
  };

  if( opts.env ) {
    cfg.use.options.presets.unshift([ 'env', opts.env ]);
  }

  return cfg;
}


const config = {
  context: pthSrc,

  // entry: {
  //   common: './common.js',
  // },

  output: {
    path: pthCDN,
    publicPath: '/static/',
    sourcePrefix: '  ',
    // pathinfo: isVerbose,
    filename: '[name].bundle.js',
  },

  // resolve: {
  //   modules: [
  //     // inProject(project.srcDir),
  //     'node_modules',
  //   ],
  //   extensions: ['*', '.js', '.jsx', '.json', '.styl'],
  // },

  // externals: project.externals,
};


const clientConfig = Object.assign({}, config, {
  entry: {
    client: ['babel-polyfill', './client.js'],
  },

  target: 'web',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(NODE_ENV) },
      __DEV__,
      __TEST__,
      __PROD__,
    })
  ],

  module: {
    rules: [
      loaderBabel({ env: { targets: { browsers: [
        "last 2 versions",
        "Safari >= 10",
        "ie >= 8"
      ]}}}),
    ]
  }
});


const serverConfig = Object.assign({}, config, {
  entry: {
    server: ['babel-polyfill', './server.js'],
  },

  output: Object.assign({}, config.output, {
    path: pthDst,
    libraryTarget: 'commonjs2',
  }),

  target: 'node',

  plugins: [
    new webpack.DefinePlugin({
      __DEV__,
      __TEST__,
      __PROD__,
    })
  ],

  module: {
    rules: [
      loaderBabel({ env: { targets: { node: '6.10' }}}),
    ]
  }
});


export default [clientConfig, serverConfig];
