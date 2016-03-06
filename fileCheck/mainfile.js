#! /usr/bin/env node

var walk = require('walkdir');

//async with path callback 

walk('../',function(path,stat){
  console.log('found: ',path);
    console.log(stat);
    //console.log(stat.isFile());
    
});

//use async emitter to capture more events

var emitter = walk('../');

emitter.on('file',function(filename,stat){
  //console.log('file from emitter: ', filename);
   // console.log(stat);
    //console.log(stat.isFile());
});


//sync with callback

walk.sync('../',function(path,stat){
//  console.log('found sync:',path);
  //  console.log(stat);
    
});

//sync just need paths

var paths = walk.sync('../');
//console.log('found paths sync: ',paths);
