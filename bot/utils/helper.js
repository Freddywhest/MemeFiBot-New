const _ = require("lodash");
function firstElement(dataArray) {
  if (dataArray.length == 0 || _.isEmpty(dataArray) || _.isNull(dataArray)) {
    return null;
  }

  return dataArray.find(() => true);
}

function calculatePrice(level) {
  const basePrice = 100; // Base price for level 0
  const levelOnePrice = 2000; // Price for level 1

  if (level === 0) {
    return basePrice;
  }

  return levelOnePrice * Math.pow(2, level - 1);
}

function generateVectorArray(taps) {
  const vectorArray = [];

  for (let tap = 0; tap < taps; tap++) {
    let value = tap;

    // Check if tap is greater than 4 or less than 1 and set it to a random number between 1 and 4
    if (value > 4 || value < 1) {
      value = _.random(1, 4);
    }

    vectorArray.push(value);
  }

  return vectorArray.join(",");
}

module.exports = { firstElement, calculatePrice, generateVectorArray };
