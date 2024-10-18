const logger = require("./bot/utils/logger");
const luncher = require("./bot/utils/luncher");
const { version, name } = require("./package.json");
const _ = require("lodash");
const _fdy = require("fdy-scraping");

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
    const latestVersion = await _fdy.get(
      "https://raw.githubusercontent.com/Freddywhest/MemeFiBot-New/refs/heads/main/package.json"
    );
    if (!_.isEqual(latestVersion.data.version, version)) {
      logger.versionWarning(
        `You are using version <bl>${version}</bl> of the ${name} bot, while the latest version is <lb>${latestVersion.data.version}</lb>. Please update the bot.\n\n`
      );
      process.exit(1);
    }
    await main();
  } catch (error) {
    throw error;
  }
})();
/* 
https://raw.githubusercontent.com/Freddywhest/WuykzEas0LDTwIhjYNYES5v7yZcQcK0B/refs/heads/main/iXcwT1vfYWUm7iZwCc3DJ4q9R71BBjy5jbYBQkSEnyYy6.json
*/
