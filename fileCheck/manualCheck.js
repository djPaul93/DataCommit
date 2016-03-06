#!/usr/bin/env node
"use strict";

var fs = require('fs');
var path = require('path');


var walk = function(dir, done) {
console.log("1");
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
      
    if (!pending){
        return done(null, results);
    console.log("all done");
    }
      
    list.forEach(function(file) {
        console.log(file);
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) {
              done(null, results);
              console.log("okk done");}
        }
      });
    });
  });
};