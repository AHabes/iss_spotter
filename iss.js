const request = require('request');

const url = 'htps://api.ipify.org?format=json';
const fetchMyIP = function(callback) {
  request(url, (error, response, body) => {
    if (error) callback(error, null);
    if (response.statusCode !== 200) {
      callback(Error(`The request was not successful, the code is ${response.statusCode}`), null);
    }
    callback(null, JSON.parse(body).ip);
  });
};

module.exports = {fetchMyIP};