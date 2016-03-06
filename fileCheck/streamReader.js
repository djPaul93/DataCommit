#!/usr/bin/env node
(function () {
    
  "use strict";
    
var fs = require('fs'), 
    byline = require('byline');
 var arr=['abc','efg','ok'];
var stream = fs.createReadStream('filename.txt');
stream = byline.createStream(stream);

stream.on('data', function(line) {
   
    var lineData=line.toString().trim();
    arr.push(lineData);
    console.log(lineData); 
    console.log(arr);
});

//stream.on('end', fucntion() {       
//  console.log('all parts is loaded');
//});
stream.on('end',function(){
  //  console.log(arr);
  // console.log("done"); 
});

}());




