const {fetchMyIP} = require('./iss');


fetchMyIP((error, body) => {
  if (error) throw error;
  console.log(body);
});