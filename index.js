const {nextISSTimesForMyLocation} = require('./iss');


const getTimes = function(time) {
  const riseTime = new Date(time['risetime']);
  const date = new Date(0);
  date.setUTCSeconds(riseTime);
  console.log(`Next pass at ${date} for ${time['duration']} seconds!`);
};

nextISSTimesForMyLocation((error, times) => {
  for (let time of times) {
    getTimes(time);
  }
});