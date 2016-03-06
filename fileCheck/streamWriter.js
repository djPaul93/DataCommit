//var fs = require('fs'),
//        v='';
//var arr=["hello","surya","deb"];
//var file = fs.createWriteStream('array.txt');
//file.on('error', function(err) { /* error handling */ });
//
//arr.forEach(function arr()
//            { 
//              //  file.write(v.join(', ') + '\n'); 
//            console.log(Array.prototype.join.call(arguments);
//
//    // OR make a new array from its values.
//                //var args = Array.prototype.slice.call(arguments);
//               // console.log(args.join(','));
//            });
//file.end();

var async = require('async'),
       fs = require('fs');
var arr=["hello","ok","done","new","mynew" ];
var file = fs.createWriteStream('array.txt');

async.eachSeries(arr, function (prime, callback) {
  console.log(prime);
    file.write(prime+'\n');
  callback(); // Alternatively: callback(new Error());
}, function (err) {
  if (err) { throw err; }
  console.log('Well done :-)!');
});