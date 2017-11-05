/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {
  // TODO

  return new Promise (function (resolve, reject) {
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
          resolve(results);
        })
        .on('error', function () {
          reject(err);
        });

    });
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  // TODO
  return new Promise (function (resolve, reject) {
    request.get(url, function (error, response, body) {
      if (error) {
        reject(error);
      } else {
        resolve(response.statusCode);
      }
    });
  });

};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
