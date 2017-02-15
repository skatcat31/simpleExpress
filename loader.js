'use strict';

// isText, camelize, camelizeVar, and the enum routes are based on code and courtesy of Vitaly Tomilov
// https://github.com/vitaly-t/

// The includes
var n = {
	fs: require('fs'),
	path: require('path'),
  isText: isText
};


/**
 * isText - test to see if something is text in a more reliabe way
 *
 * @param  {String} t Text to test
 * @return {Boolean}      true or false
 */
function isText(t) {
    return t && typeof t === 'string' && /\S/.test(t);
}

/**
 * camelize - Camelcase a string based on regex triggers
 *
 * @param  {String} text The string to camelCase
 * @return {String}      The camelCased string
 */
function camelize(text) {
    text = text.replace(/[\-_\s\.]+(.)?/g, function (match, chr) {
        return chr ? chr.toUpperCase() : '';
    });
    return text.substr(0, 1).toLowerCase() + text.substr(1);
}

/**
 * camelizeVar - A variable safe version of the camelize function.
 * Any string that comes out of this function is a valid property name
 * Useful for Object[text] declerations
 *
 * @param  {String} text The string to camelCase safely
 * @return {String}      The camelCased, property safe string
 */
function camelizeVar(text) {
    text = text.replace(/[^a-zA-Z0-9\$_\-\s\.]/g, '').replace(/^[0-9_\-\s\.]+/, '');
		return camelize(text);
}

/**
 * _enumJS - Pass over a folder creating a Tree Object
 * The sub folders of the folder enumerated over are required into the Tree
 * Non recursive
 *
 * @param  {String} dir the path to go over
 * @return {Object}     the Tree Object containing the properties
 */
function _enumJS(dir) {
    var tree = {};
		if(!n.fs.existsSync(dir)){return tree;}
    n.fs.readdirSync(dir).forEach(function (file) {
        var stat, name, fullPath = n.path.join(dir, file);
        stat = n.fs.statSync(fullPath);
        if (stat.isDirectory()) {
            name = camelizeVar(file);
						if(!name.length || name in tree){
								throw new Error("Empty or duplicate camelized folder name: " + fullPath);
						}
            tree[name] = require(fullPath);
        } else if (n.path.extname(file).toLowerCase() === '.js') {
						name = camelizeVar(file.replace(/\.[^/.]+$/, ''));
						if(!name.length || name in tree){
								throw new Error("Empty or duplicate camelized file name: " + fullPath);
						}
						tree[name] = require(fullPath);
				}
    });
    return tree;
}

/**
 * _enumRoutes - A specific enum function to passover a specific pattern
 * Designed only to work with folders containing express based routers
 *
 * @param  {String} dir The directory to traverse
 * @return {Array}     An Array of object containing the route and routers
 */
function _enumRoutes(dir) {
    var tree = [];
		if(!n.fs.existsSync(dir)){return tree;}
    n.fs.readdirSync(dir).forEach(function (file) {
        var stat, name, fullPath = n.path.join(dir, file);
        stat = n.fs.statSync(fullPath);
        if (stat.isDirectory()) {
            //we want to push the object and it's routes
            tree.push(require(fullPath));
        } else if (n.path.extname(file).toLowerCase() === '.js') {
						name = camelizeVar(file.replace(/\.[^/.]+$/, ''));
						if(!name.length){
								throw new Error("Empty file name: " + fullPath);
						}
						tree.push(require(fullPath));
				}
    });
    return tree;
}

/**
 * modules - Pre flight
 *
 * @param  {String} dir The directory to traverse
 * @return {Object}     The Tree Object
 */
function modules(dir) {
    if (!n.isText(dir)) {
        throw new TypeError("Parameter 'dir' must be a non-empty text string.");
    }
    return _enumJS(dir);
}

/**
 * routes - Pre Flight
 *
 * @param  {String} dir The directory to Traverse
 * @return {Array}    The Array of Objects
 */
function routes(dir) {
  if (!n.isText(dir)) {
      throw new TypeError("Parameter 'dir' must be a non-empty text string.");
  }
  return _enumRoutes(dir);
}

/**
 * middleware - Pre Flight
 *
 * @param  {String} dir The directory to Traverse
 * @return {Array}    The Array of Objects
 */
function middleware(dir) {
  if (!n.isText(dir)) {
      throw new TypeError("Parameter 'dir' must be a non-empty text string.");
  }
  return _enumRoutes(dir);
}

module.exports = {
  modules,
  routes,
	middleware
};
