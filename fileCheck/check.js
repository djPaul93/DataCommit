#!/usr/bin/env node

"use strict";

var walk    = require('walk')
  , fs      = require('fs')
  , path    = require('path')
  , walker  = walk.walk("./node_modules", { followLinks: false })
  ;

walker.on("file", fileHandler);
walker.on("errors", errorsHandler); // plural
walker.on("end", endHandler);

function fileHandler(root, fileStat, next) {
  fs.readFile(path.resolve(root, fileStat.name), function (buffer) {
    // console.log(fs.lstatSync(path.resolve(root, fileStat.name)).isDirectory());
    console.log(fileStat.type);
     // console.log(fileStat.isDirectory());
    //  console.log(fileStat.type);
    next();
  });
}

function errorsHandler(root, nodeStatsArray, next) {
  nodeStatsArray.forEach(function (n) {
    console.error("[ERROR] " + n.name)
    console.error(n.error.message || (n.error.code + ": " + n.error.path));
  });
  next();
}

walker.on("../", function(err, results) {
  if (err) throw err;
  console.log(results);
});

function endHandler() {
  console.log("all done");
}