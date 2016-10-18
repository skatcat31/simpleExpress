# simpleExpress
a simple express framework designed to work on convention, not configuration

## Unlicensed during development
This project is unlicensed until the initial beta version is released. Upon release/collaberation it will licensed with appropriate license

# Defaults
There aren't any!  
This framework is being designed in such a way that it is a simple jumping point into the world of Express where you don't have to configure more than the initial config file and app file. Everything else is drag and drop!
## But Wait a Minute!
> This looks a lot like the Express generated application. What gives?

Well yeah, eventually all Express Apps look... well the same. The difference here is your routes(held in Express Routers), modules, and views will be automatically loaded into the application, and same with your modules.

All you have to do is code your routers and export them to convention and BAM! Working express app!
## The Conventions Mentioned
Okay so the word **convention** has been passed around here a few times. What does convention mean? Well a simple [Google search](https://google.com) gives an easy answer there.  
In more general terms, as long as your routes, modules, and all other files are correctly loaded the application will just work.  
In fact all you need to provide to the constructor is the **__dirname** from the main mounting point. This makes it completely compatible with process managers right out of the box too!  
Want a module that can be used in more than one place? Make a module!  
Want a router that responds to requests? Make a Router!
Want to use views? Make a view, and tell it what engine to use!

In fact if this is done correctly all you have to do is provide the folders **routes**, **views**\*, and **modules**\* as well as an index.js that calls the package and provides the **__dirname**, and that's it! Your routes, modules, and views will automatically be loaded.


\*: *Optional*, if not found will not be loaded
