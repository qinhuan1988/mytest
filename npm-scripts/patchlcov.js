// require modules

var fs = require('fs');

// variables, can be made configurable

var cwd = process.cwd();
var filename = process.argv[2];

/*
Reads our lcov file and replaces its absolute
paths for paths relative to the current project
*/

fs.readFile(filename, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  var regex = new RegExp(cwd + '[\/]', 'g');
  var result = data.replace(regex, '');

  console.info('Replacing absolute paths in ' + filename);
  fs.writeFile(filename, result, 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
    console.info('Replacing absolute paths in ' + filename + ' DONE!');
  });
});
