# simpleExpress
a simple express framework designed to work on convention, not configuration

## Alpha Release
This project is provided under the standard ISC license during Alpha development  
Pull requests are welcome, so are issues  
Documentation is ongoing. Eventually there will be tests, and documentation  
This software is provided AS IS!

# Defaults
There aren't any!  
This framework is being designed in such a way that it is a simple jumping point into the world of Express where you don't have to configure more than the package file and app file. Everything else is drag and drop!
## But Wait a Minute!
> The template looks a lot like the Express generated application. What gives?

Well yeah, eventually all Express Apps look... well the same. The difference here is your routes(held in Express Routers or Sub Apps) and plugins will be automatically loaded into the application.

All you have to do is code your routers and export them to convention and BAM! Working express app!
## The Conventions Mentioned
Okay so the word **convention** has been passed around here a few times. What does convention mean? Well a simple [Google search](https://google.com) gives an easy answer there.  
In more general terms, as long as your routes, plugins, and all other files are correctly located and exported the application will just work.  
In fact all you need to provide to the constructor is the **__dirname** from the main mounting point. This makes it completely compatible with process managers right out of the box too!  
Want a piece of code that can be used in more than one place? Make a plugin!  
Want a router that responds to requests? Make a Router!  
Want to use views? Make a sub app, tell it what engine to use, and export it!

In fact if this is done correctly all you have to do is provide the folders **routes**, **middleware**\*, and **plugins**\* as well as a main file that calls the package and provides the **__dirname**, and that's it! Your routes and plugins will automatically be loaded.

\*: *Optional*, if not found will not be loaded

### middleware
Middleware is any found require in the **middleware** folder with the following export properties:

```js
{
  before: Boolean, // does this get used globally before routes?
  after: Boolean, // does this middleware get user after routes?
  middleware: Function // the actual expressjs compatible middleware
}
```
Notes:

 - Because these filed are loaded as global middleware it will load in the order that the filesystem returns them in
 - Middleware can be double registered as both before *and* after. This is helpful for debugging middleware that would track the lifecycle of the request
 
### routes
Routes is any found require in the **routes** folder with the following export properties:

```js
{
  path: String, // route string to be passed to app.use
  router: Function, // expressJS Router instance to be passed to app.use
  handler Function // alias of router
}
```

### plugins
A Plugin is a function that is loaded from the **plugins** directory. It is merely a function that will be loaded with the Filesystem Stats name after converting it to camelcase as the plugin reference
```js
// logger.js
module.exports = arg => console.log(arg);

// middleware
req.app.locals.plugins.logger('hello from your handler';
```

# Delayed launching
Often times it's useful to launch the server separate from the express app, and just mount the express app. To do this instead pass a second argument that loosely evaluates to true. This will return the application, and it will not call the express server shortcut.  
```javascript
const app = require('simpleexpress')(__dirname, true);
const server = require('http').createServer();
server.on('request', app);
server.listen();
```

# Port and SSL configuration
It'd be nice to load some often used configuration like where the SSL configuration lives and what port to launch from. These are loaded from the Package.json using Yargs and accepts the following format:
```js
{
  port: Number, // [optional] what port to automatically launch from when done scaffolding. If not found random
  secure: { // [optional] if not found will be launched without SSL support over plain HTTP port
    key: String, // path to key for SSL
    cert: String // path to cert for SSL
  }
}
```

# To Do
 - ~~Delay auto starting of application~~(added as of 1.1.0)  
 Pass constructor second argument(loose eval to true delays)  
 This allows you to manually register the auto loaded application into a server(useful for websockets or other more advanced HTTP features)
 - Template app example
 - ~~Automatic detection of global middleware~~(added as of 1.0.0 release)
 - ~~Automatic detection of global views~~(removed, mount a sub app and have a view engine, or use a plugin for global views for rendering)
 - ~~Automatic detection of nested views inside of Project Tree~~(removed, see above)
 - CLI interface for global installs
 - Documentation
 - Testing
