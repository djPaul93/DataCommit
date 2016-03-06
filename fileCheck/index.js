#!/usr/bin/env node
(function () {
  "use strict";

  var walk = require('walk')
    , fs = require('fs')
    , options
    , walker
    ;

  // To be truly synchronous in the emitter and maintain a compatible api,
  // the listeners must be listed before the object is created
  options = {
    listeners: {
      names: function (root, nodeNamesArray) {
        nodeNamesArray.sort(function (a, b) {
          if (a > b) return 1;
          if (a < b) return -1;
          return 0;
        });
      }
    , directories: function (root, dirStatsArray, next) {
        // dirStatsArray is an array of `stat` objects with the additional attributes
        // * type
        // * error
        // * name
       console.log(dirStatsArray[0]["name"]);
       // console.log(dirStatsArray);

        next();
      }
    , file: function (root, fileStats, next) {
        fs.readFile(fileStats.name, function () {
          // doStuff
          //  console.log(fileStats.name);
//            console.log(fileStats.isDirectory());
          next();
        });
      }
    , errors: function (root, nodeStatsArray, next) {
        next();
      }
    }
  };

  walker = walk.walkSync("./node_modules", options);

  console.log("all done");
}());
