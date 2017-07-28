
export function format(time) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

function formatTask(task, options) {
  return `'${task.name}${options ? ` (${options})` : ''}'`;
}

function logMessage(date, msg) {
  console.log(`[${ format(date) }] ${ msg }`);
}

function run(fn, options) {
  const task = typeof fn.default === 'undefined' ? fn : fn.default;
  const start = new Date();
  logMessage(start,
    `Starting ${ formatTask(task, options) }...`);
  return task(options).then(resolution => {
    const end = new Date();
    const time = end.getTime() - start.getTime();
    logMessage(end,
      `Finished ${ formatTask(task, options) } after ${time} ms`);
    return resolution;
  });
}

if (require.main === module && process.argv.length > 2) {
  // eslint-disable-next-line no-underscore-dangle
  delete require.cache[__filename];
  // eslint-disable-line import/no-dynamic-require
  const module = require(`./${ process.argv[2] }.js`).default;
  run(module)
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });
}


export default run;
