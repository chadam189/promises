/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {

  fs.readFile(filePath, 'utf8', function (err, results) {

    var rs = fs.createReadStream(filePath, {encoding: 'utf8'});
    var acc = '';
    var pos = 0;
    var index;
    rs
      .on('data', function (chunk) {
        index = chunk.indexOf('\n');
        acc += chunk;
        index !== -1 ? rs.close() : pos += chunk.length;
      })
      .on('close', function () {
        results = acc.slice(0, pos + index);
        callback(null, results);
      })
      .on('error', function () {
        callback(err);
      });
  });
}; 

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  request.get(url, function (error, response, body) {
    if (error) {
      callback(error);
    } else {
      callback( null, response.statusCode);
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
