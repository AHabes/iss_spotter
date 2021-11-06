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
    callback(null, {latitude: data.latitude, longitude: data.longitude});
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
    if (error) callback(error, null);
    if (response.statusCode !== 200) {
      callback(Error(`The request was not successful, the code is ${response.statusCode}`), null);
    }
    callback(null, JSON.parse(body).response);
  });
};

const nextISSTimesForMyLocation = function(MainCallback) {
  fetchMyIP((error, body) => {
    if (error) throw error;
    fetchCoordsByIP(body, (error, body) => {
      if (error) throw error;
      const coords = {latitude: body.latitude, longitude: body.longitude};
      fetchISSFlyOverTimes(coords, (error, times) => {
        if (error) throw error;
        return MainCallback(null, times);
      });
    });
  });
};

module.exports = {nextISSTimesForMyLocation};