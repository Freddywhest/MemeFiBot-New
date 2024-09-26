const settings = require("./bot/config/config");
const proxies = require("./bot/config/proxies");
const NonSessionTapper = require("./bot/core/nonSessionTapper");
const banner = require("./bot/utils/banner");
const logger = require("./bot/utils/logger");
const luncher = require("./bot/utils/luncher");
const path = require("path");
const sleep = require("./bot/utils/sleep");

const main = async () => {
  const nodeVersion = process.version;
  const major = process.versions
    ? parseInt(nodeVersion.split(".")[0].replace("v", ""), 10)
    : 0;
  if (major < 18 || major > 20 || isNaN(major) || major === 0) {
    return logger.error(
      "To run this bot, Node.js version <la>18.x</la> or <lb>20.x</lb> is required.\n Current version: <bl>" +
        nodeVersion +
        "</bl>"
    );
  }
  await luncher.process();
};

// Wrap main function execution in an async context to handle asynchronous operations
(async () => {
  try {
    await main();
  } catch (error) {
    throw error;
  }
})();
