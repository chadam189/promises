/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var constructors = require('./promiseConstructor.js');
var proms = require('./promisification.js');
var writeFA = Promise.promisify(fs.writeFile);

var writeToFileAsync = function(filePath, data) {
  return new Promise (function (resolve, reject) {
    fs.writeFile(filePath, data, 'utf8', function (err, results) {
      var ws = fs.createWriteStream(filePath, {encoding: 'utf8'});
      var body = '';
      console.log('body1 = ', body);
      ws
        .on('data', function (chunk) {
          body += chunk;
          console.log('body2 = ', body);
        })
        .on('end', function () {
          body = Buffer.concat(body).toString();
          console.log('body3 = ', body);
          results = body;
          resolve(results);
        })
        .on('error', function () {
          reject(err);
        });
        

    });
  });
};

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return constructors.pluckFirstLineFromFileAsync(readFilePath)
    .then(function (user) {
      return proms.getGitHubProfileAsync(user);
    })
    .then(function (profile) {
      return writeFA(writeFilePath, JSON.stringify(profile));
    });
};





// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
