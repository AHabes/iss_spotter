const request = require('request-promise-native');


const fetchMyIP = function() {
  const url = 'https://api.ipify.org?format=json';
  return request(url);
};

const fetchCoordsByIP = function(result) {
  const ip = JSON.parse(result).ip;
  const url = `https://freegeoip.app/json/${ip}`;
  return request(url);
};

const fetchISSFlyOverTimes = function(coords) {
  coords = JSON.parse(coords);
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(times => JSON.parse(times).response);
};
module.exports = {nextISSTimesForMyLocation};