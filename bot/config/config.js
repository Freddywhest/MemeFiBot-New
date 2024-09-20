require("dotenv").config();
const _isArray = require("../utils/_isArray");
const settings = {
  API_ID:
    process.env.API_ID && /^\d+$/.test(process.env.API_ID)
      ? parseInt(process.env.API_ID)
      : process.env.API_ID && !/^\d+$/.test(process.env.API_ID)
      ? "N/A"
      : undefined,
  API_HASH: process.env.API_HASH || "",

  AUTO_APPLY_TURBO: process.env.AUTO_APPLY_TURBO
    ? process.env.AUTO_APPLY_TURBO.toLowerCase() === "true"
    : true,

  AUTO_APPLY_ENERGY: process.env.AUTO_APPLY_ENERGY
    ? process.env.AUTO_APPLY_ENERGY.toLowerCase() === "true"
    : true,

  AUTO_UPGRADE_DAMAGE: process.env.AUTO_UPGRADE_DAMAGE
    ? process.env.AUTO_UPGRADE_DAMAGE.toLowerCase() === "true"
    : true,

  AUTO_UPGRADE_RECHARGE: process.env.AUTO_UPGRADE_RECHARGE
    ? process.env.AUTO_UPGRADE_RECHARGE.toLowerCase() === "true"
    : true,

  AUTO_UPGRADE_ENERGY: process.env.AUTO_UPGRADE_ENERGY
    ? process.env.AUTO_UPGRADE_ENERGY.toLowerCase() === "true"
    : true,

  AUTO_BUY_TAPBOT: process.env.AUTO_BUY_TAPBOT
    ? process.env.AUTO_BUY_TAPBOT.toLowerCase() === "true"
    : true,

  AUTO_CLAIM_AND_START_TAPBOT: process.env.AUTO_CLAIM_AND_START_TAPBOT
    ? process.env.AUTO_CLAIM_AND_START_TAPBOT.toLowerCase() === "true"
    : true,

  AUTO_COMPLETE_TASKS: process.env.AUTO_COMPLETE_TASKS
    ? process.env.AUTO_COMPLETE_TASKS.toLowerCase() === "true"
    : true,

  AUTO_SPIN: process.env.AUTO_SPIN
    ? process.env.AUTO_SPIN.toLowerCase() === "true"
    : true,

  MAX_DAMAGE_LEVEL: process.env.MAX_DAMAGE_LEVEL
    ? /^\d+$/.test(process.env.MAX_DAMAGE_LEVEL)
    : 4,

  MAX_RECHARGE_LEVEL: process.env.MAX_RECHARGE_LEVEL
    ? /^\d+$/.test(process.env.MAX_RECHARGE_LEVEL)
    : 4,

  MAX_ENERGY_LEVEL: process.env.MAX_ENERGY_LEVEL
    ? /^\d+$/.test(process.env.MAX_ENERGY_LEVEL)
    : 4,

  MIN_AVAILABLE_ENERGY: process.env.MIN_AVAILABLE_ENERGY
    ? /^\d+$/.test(process.env.MIN_AVAILABLE_ENERGY)
    : 500,

  RANDOM_TURBO_TAPS:
    process.env.RANDOM_TURBO_TAPS && _isArray(process.env.RANDOM_TURBO_TAPS)
      ? JSON.parse(process.env.RANDOM_TURBO_TAPS)
      : [1000, 1500],

  RANDOM_TAPS:
    process.env.RANDOM_TAPS && _isArray(process.env.RANDOM_TAPS)
      ? JSON.parse(process.env.RANDOM_TAPS)
      : [50, 200],

  SLEEP_BETWEEN_REQUESTS:
    process.env.SLEEP_BETWEEN_REQUESTS &&
    _isArray(process.env.SLEEP_BETWEEN_REQUESTS)
      ? JSON.parse(process.env.SLEEP_BETWEEN_REQUESTS)
      : process.env.SLEEP_BETWEEN_REQUESTS &&
        /^\d+$/.test(process.env.SLEEP_BETWEEN_REQUESTS)
      ? parseInt(process.env.SLEEP_BETWEEN_REQUESTS)
      : 150,

  USE_PROXY_FROM_FILE: process.env.USE_PROXY_FROM_FILE
    ? process.env.USE_PROXY_FROM_FILE.toLowerCase() === "true"
    : false,

  USE_REGISTRATION_PROXY: process.env.USE_REGISTRATION_PROXY
    ? process.env.USE_REGISTRATION_PROXY.toLowerCase() === "true"
    : false,

  USE_QUERY_ID: process.env.USE_QUERY_ID
    ? process.env.USE_QUERY_ID.toLowerCase() === "true"
    : false,
};

module.exports = settings;
