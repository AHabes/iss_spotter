const {nextISSTimesForMyLocation} = require('./iss_promised');

const getTimes = function(times) {
  for (let time of times) {
    const riseTime = new Date(time['risetime']);
    const date = new Date(0);
    date.setUTCSeconds(riseTime);
    console.log(`Next pass at ${date} for ${time['duration']} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then(times => getTimes(times))
  .catch(err => console.log(err));

