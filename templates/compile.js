// templates/compile.js
// compile Jade templates for client to consume.

var fs   = require('fs');
var Jade = require('jade');


// sofajs function record template

var jsFunctionString = Jade.compileFileClient(__dirname + '/jade/record.jade', {name: "recordTemplate"});

// compile template

fs.writeFileSync(__dirname + "/../public/js/templates.js", jsFunctionString);

// fs.appendFile(filename, data[, options], callback)

var sampleTemplate = Jade.compileFileClient(__dirname + '/jade/sample.jade', {name: "sampleTemplate"});

fs.appendFileSync(__dirname + "/../public/js/templates.js", sampleTemplate)

