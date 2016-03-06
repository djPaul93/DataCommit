#!/usr/bin/env node

"use strict";

var modeFiles ='0644', modeDir = '0755';
var walk = require('fs-walk')
          , fs      = require('fs')
          , path    = require('path');
 
walk.files('./node_modules', function(basedir, filename, stat, next) {
	fs.chmod(path.join(basedir, filename), modeFiles, next);
    console.log(next);
   // console.log(filename);
}, function(err) {
    if (err) console.log(err);
});
 
walk.dirs('./node_modules', function(basedir, filename, stat, next) {
	fs.chmod(path.join(basedir, filename), modeDir, next);
   // console.log(filename);
}, function(err) {
    if (err) console.log(err);
});
