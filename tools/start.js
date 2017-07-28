import webpack from 'webpack';

import runServer from './runServer';
import webpackConfig from './webpack.config';


async function start() {
  await new Promise(resolve =>
    webpack(webpackConfig, async (err, stats) => {
      process.stdout.write(stats.toString() + "\n");
      const server = await runServer();
      resolve();
    })
  );
}


export default start;
