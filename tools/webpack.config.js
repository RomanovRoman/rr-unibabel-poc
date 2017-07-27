import path from 'path';
import webpack from 'webpack';


const NODE_ENV = process.env.NODE_ENV || 'development'


const project = {
  /** The environment to use when building the project */
  env: NODE_ENV,
  /** The full path to the project's root directory */
  basePath: __dirname,
  /** The name of the directory containing the application source code */
  srcDir: 'src',
  /** The file name of the application's entry point */
  main: 'main',
  /** The name of the directory in which to emit compiled assets */
  outDir: 'dist',
  /** The base path for all projects assets (relative to the website root) */
  publicPath: '/',
  /** Whether to generate sourcemaps */
  sourcemaps: true,
  /** A hash map of keys that the compiler should treat as external to the project */
  externals: {},
  /** A hash map of variables and their values to expose globally */
  globals: {},
  /** Whether to enable verbose logging */
  verbose: false,
  /** The list of modules to bundle separately from the core application code */
  vendors: [
    // 'react',
    // 'react-dom',
    // 'redux',
    // 'react-redux',
    // 'redux-thunk',
    // 'react-router',
  ],
}


const __DEV__ = project.env === 'development'
const __TEST__ = project.env === 'test'
const __PROD__ = project.env === 'production'


const pthRoot = path.resolve(__dirname, '..');
const pthSrc = path.join(pthRoot, 'src');
const pthDst = path.join(pthRoot, 'dist', 'server');
const pthCDN = path.join(pthDst, 'static');


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

  resolve: {
    modules: [
      // inProject(project.srcDir),
      'node_modules',
    ],
    extensions: ['*', '.js', '.jsx', '.json', '.styl'],
  },

  externals: project.externals,

  module: {
    rules: [],
  },

  plugins: [
    new webpack.DefinePlugin(Object.assign({
      'process.env': { NODE_ENV: JSON.stringify(project.env || 'development') },
      __DEV__,
      __TEST__,
      __PROD__,
    }, project.globals))
  ],
};


const clientConfig = Object.assign({}, config, {
  entry: {
    client: ['babel-polyfill', './client.js'],
  },

  target: 'web',
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
});


export default [clientConfig, serverConfig];
