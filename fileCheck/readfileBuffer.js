var reader = require ("buffered-reader");
var DataReader = reader.DataReader;


//var close = function (binaryReader, error){
//    if (error) console.log (error);
//
//    binaryReader.close (function (error){
//        if (error) console.log (error);
//    });
//};

var file = "filename.txt";

new DataReader (file, { encoding: "utf8" })
        .on ("error", function (error){
            console.log (error);
        })
        .on ("line", function (line){
                console.log(line);
        })
        .on ("end", function (){
    //console.log("end of file");
        })
        .read ();