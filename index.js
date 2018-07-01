'use strict';

function __constructor(dir, noStart) {
  const packages = require(dir + '/package.json');
  const yargs = require('yargs');
  const argv = yargs
    .help('h')
    .options(packages.args)
    .version(packages.version)
    .argv;
  // start the app
  const Express = require('express');
  const app = Express();
  const loader = require(__dirname + '/loader');
  const routes = loader.routes(dir + '/routes');
  const middle = loader.middleware(dir + '/middleware');
  const before = middle.filter(obj => obj.before).map(obj => obj.middleware);
  const after = middle.filter(obj => obj.after).map(obj => obj.middleware);
  app.locals.plugins = loader.modules(dir + '/plugins');
  //register the middleware to be called before routes
  before.forEach(mw => {
    app.use(mw);
  });
  // register the routes
  routes.forEach(obj => {
    app.use(obj.path, obj.router || obj.handler);
  });
  //register the middleware to be called after routes
  after.forEach(mw => {
    app.use(mw);
  });
  if (!noStart) {
    if (!argv.secure) {
      (argv.port) ? app.listen(argv.port, logStart) : app.listen(logStart);
    } else {
      var fs = require('fs');
      argv.secure.key = fs.readFileSync(argv.secure.key);
      argv.secure.cert = fs.readFileSync(argv.secure.cert);
      var server = require('https').createServer(argv.secure, app);
      (argv.port) ? server.listen(argv.p, logStart) : server.listen(logStart);
    }
  } else {
    app.locals.logStart = logStart;
  }
  app.disable('x-powered-by');
  return app;
}

// Tell them we're up and running(useful if the script restarts. You'll notice it in log)
function logStart() {
  console.log('================================================================================');
  console.log('Server running ' + Date());
  console.log('PID: ' + process.pid);
  console.log('Port: ' + this.address().port);
  console.log('================================================================================');
}

module.exports = __constructor;
