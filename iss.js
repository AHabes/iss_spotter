const request = require('request');


const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org?format=json';
  request(url, (error, response, body) => {
    if (error) callback(error, null);
    if (response.statusCode !== 200) {
      callback(Error(`The request was not successful, the code is ${response.statusCode}`), null);
    }
    callback(null, JSON.parse(body).ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  const url = `https://freegeoip.app/json/${ip}`;
  request(url, (error, response, body) => {
    if (error) callback(error, null);
    if (response.statusCode !== 200) {
      callback(Error(`The request was not successful, the code is ${response.statusCode}`), null);
    }
    const data = JSON.parse(body);
    callback(null, { latitude: data.latitude, longitude: data.longitude });
  });
};

module.exports = {fetchMyIP, fetchCoordsByIP};