const _ = require("lodash");
function sleep(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

function generateDelays(numRequests) {
  const delays = [];
  for (let i = 0; i < numRequests; i++) {
    delays.push(_.random(5, 60));
  }
  return _.shuffle(delays); // Shuffle to make the delays unique
}

module.exports = sleep;
module.exports.generateDelays = generateDelays;
