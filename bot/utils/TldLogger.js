"use strict";

const logger = require("./logger");

exports.Logger = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
  LogLevel["NONE"] = "none";
  LogLevel["ERROR"] = "error";
  LogLevel["WARN"] = "warn";
  LogLevel["INFO"] = "info";
  LogLevel["DEBUG"] = "debug";
})((LogLevel = exports.LogLevel || (exports.LogLevel = {})));
class Logger {
  constructor(level) {
    this.levels = ["error", "warn", "info", "debug"];
    // if (!_level) {
    //     _level = level || "info"; // defaults to info
    // }
    this._logLevel = "error";
  }
  /**
   *
   * @param level {string}
   * @returns {boolean}
   */
  canSend(level) {
    return this._logLevel
      ? this.levels.indexOf(this._logLevel) >= this.levels.indexOf(level)
      : false;
  }
  /**
   * @param message {string}
   */
  warn(message) {
    return null;
  }
  /**
   * @param message {string}
   */
  info(message) {
    this._log(
      LogLevel.INFO,
      message
        .replace(/gramJS/i, "FreddyBot")
        .replace(/(version\s+)[\d.]+/, "$11.0.0")
    );
  }
  /**
   * @param message {string}
   */
  debug(message) {
    this._log(LogLevel.DEBUG, message);
  }
  /**
   * @param message {string}
   */
  error(message) {
    this._log(LogLevel.ERROR, message);
  }

  get logLevel() {
    return this._logLevel;
  }
  setLevel(level) {
    this._logLevel = level;
  }
  static setLevel(level) {
    console.log(
      "Logger.setLevel is deprecated, it will has no effect. Please, use client.setLogLevel instead."
    );
  }
  /**
   * @param level {string}
   * @param message {string}
   */
  _log(level, message) {
    if (this.canSend(level)) {
      this.log(level, message);
    } else {
      return;
    }
  }

  log(level, message) {
    if (level == "info") {
      logger.info(message);
    } else if (level == "debug") {
      logger.debug(message);
    } else if (level == "error") {
      logger.error(message);
    } else if (level == "warn") {
      logger.warning(message);
    }
  }
}
const logger2 = new Logger();
module.exports = logger2;
