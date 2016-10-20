# Simple README for now explaining the purpose of this repository as it will be developed

# simpleExpress
a simple express framework designed to work on convention, not configuration

## Alpha Release
This project is provided under the standard ISC license during Alpha development  
Pull requests are welcome, so are issues  
Documentation is ongoing. Eventually there will be tests, and documentation  
This software is provided AS IS!

# Defaults
There aren't any!  
This framework is being designed in such a way that it is a simple jumping point into the world of Express where you don't have to configure more than the initial config file and app file. Everything else is drag and drop!
## But Wait a Minute!
> Th template looks a lot like the Express generated application. What gives?

Well yeah, eventually all Express Apps look... well the same. The difference here is your routes(held in Express Routers), modules, and views will be automatically loaded into the application, and same with your modules.

All you have to do is code your routers and export them to convention and BAM! Working express app!
## The Conventions Mentioned
Okay so the word **convention** has been passed around here a few times. What does convention mean? Well a simple [Google search](https://google.com) gives an easy answer there.  
In more general terms, as long as your routes, plugins, and all other files are correctly located and exported the application will just work.  
In fact all you need to provide to the constructor is the **__dirname** from the main mounting point. This makes it completely compatible with process managers right out of the box too!  
Want a module that can be used in more than one place? Make a module!  
Want a router that responds to requests? Make a Router!  
Want to use views? Make a view, and tell it what engine to use!

In fact if this is done correctly all you have to do is provide the folders **routes**, **views**\*, and **plugins**\* as well as a main file that calls the package and provides the **__dirname**, and that's it! Your routes, modules, and views will automatically be loaded.


\*: *Optional*, if not found will not be loaded

# To Do
 - Template app example
 - Automatic detection of global middleware
 - Automatic detection of global views
 - Automatic detection of nested views inside of Project Tree
 - CLI interface for global installs
 - Documentation
 - Testing

