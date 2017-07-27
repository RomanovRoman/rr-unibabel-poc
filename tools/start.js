import webpack from 'webpack';

import runServer from './runServer';
import webpackConfig from './webpack.config';


async function start() {
  await new Promise(resolve => {
    const bundler = webpack(webpackConfig);

    // let handleBundleComplete = async () => {
    //   console.log('first handleBundleComplete')
    //   handleBundleComplete = stats =>
    //     !stats.stats[1].compilation.errors.length && runServer();

    //   const server = await runServer();
    //   resolve();
    // };
    console.log('waiting "done"')
    bundler.plugin('done', stats => handleBundleComplete(stats));
    resolve();
  });
  console.log('started')
}


export default start;
