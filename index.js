const {fetchMyIP} = require('./iss');
const {fetchCoordsByIP} = require('./iss');

fetchMyIP((error, body) => {
  if (error) throw error;
  fetchCoordsByIP(body, (error, body) => {
    if (error) throw error;
    console.log(body);
  });
});



