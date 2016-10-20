'use strict';

function __constructor (dir){
  const	packages = require(dir+'/package.json');
  const yargs = require('yargs');
  const argv = yargs
    .help('h')
    .options(packages.args)
    .version(packages.version)
    .argv;
  // start the app
  const	Express = require('express');
  const app = Express();
  const loader = require(__dirname+'/loader');
  const routes = loader.routes(dir+'/routes');
  app.locals.plugins = loader.modules(dir+'/modules');
  // register the routes
  for (var i = 0; i < routes.length; i++) {
    if(Array.isArray(routes[i].path)){
      routes[i].path.forEach(p => app.use(p, routes[i].router));
    }else{
      app.use(routes[i].path, routes[i].router);
    }
  }
  // let's listen for connections
  var serv;
  if(!argv.secure){
    (argv.port)? app.listen(argv.port, logStart):app.listen(logStart);
  }else{
    var fs = require('fs');
    var key = fs.readFileSync(argv.secure.key);
    var cert = fs.readFileSync(argv.secure.cert);
    var credentials = {key, cert};
    var server = require('https').createServer(credentials, app);
    (argv.port)? server.listen(argv.p, logStart):server.listen(logStart);
  }
  app.disable('x-powered-by');

  // Tell them we're up and running(useful if the script restarts. You'll notice it in log)
  function logStart(){
    console.log('================================================================================');
    console.log('Server running '+Date());
    console.log( 'PID: '+process.pid);
    console.log( 'Port: '+ this.address().port);
    console.log('================================================================================');
  }
  return app;
}

module.exports = __constructor;
