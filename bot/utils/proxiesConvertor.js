const logger = require("./logger");
const path = require("path");
const fs = require("fs");

function proxiesConvertor(proxyStrings) {
  return proxyStrings.map((proxyString) => {
    const regex =
      /^(\w+):\/\/(?:(\w+):(\w+)@)?([\d.]+):(\d+)(?::(\w+):(\w+))?$/;
    const alternateRegex = /^(\w+):\/\/([\d.]+):(\d+)(?:@(\w+):(\w+))?$/;
    const secregex = /^(\w+):\/\/(\w+):(\w+):([\d.]+):(\d+)$/;
    // Regex to handle user:pass@ip:port or user:pass:ip:port
    const otherRegex = /^(\w+):\/\/(?:(\w+):(\w+)@)?([\d.]+):(\d+)$/;

    let match = proxyString.match(regex);
    let altMatch = proxyString.match(alternateRegex);

    let secrematch = proxyString.match(secregex);
    let otherMatch = proxyString.match(otherRegex);

    if (match) {
      const [
        ,
        protocol,
        username,
        password,
        ip,
        port,
        altUsername,
        altPassword,
      ] = match;
      return {
        ip,
        port: parseInt(port, 10),
        protocol: protocol || "http",
        username: username || altUsername || null,
        password: password || altPassword || null,
      };
    } else if (altMatch) {
      const [, protocol, ip, port, username, password] = altMatch;
      return {
        ip,
        port: parseInt(port, 10),
        protocol: protocol || "http",
        username: username || null,
        password: password || null,
      };
    } else if (secrematch) {
      // For format: type://user:pass:ip:port
      console.log(secregex);

      const [, protocol, username, password, ip, port] = secrematch;
      return {
        ip,
        port: parseInt(port, 10),
        protocol: protocol || "http",
        username: username || null,
        password: password || null,
      };
    } else if (otherMatch) {
      // For other formats like type://user:pass@ip:port and type://user:pass:ip:port
      const [, protocol, username, password, ip, port] = otherMatch;
      return {
        ip,
        port: parseInt(port, 10),
        protocol: protocol || "http",
        username: username || null,
        password: password || null,
      };
    } else {
      throw new Error(`Invalid proxy format: ${proxyString}`);
    }
  });
}

function readProxiesFromFile() {
  try {
    const filePath = path.join(process.cwd(), "bot", "config", "proxies.txt");
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      logger.error(`File not found: ${filePath}`);
      return [];
    }
    // Read the file content
    const data = fs.readFileSync(filePath, "utf-8");

    // Split the content by newline, trim extra spaces, and filter out empty lines
    const proxyStrings = data
      .split("\n") // Split by newlines
      .map((line) => line.trim()) // Remove extra spaces
      .filter((line) => line.length > 0); // Filter out empty lines

    return proxyStrings;
  } catch (err) {
    logger.error(`Error reading file: ${err.message}`);
    return [];
  }
}

module.exports = proxiesConvertor;

module.exports.readProxiesFromFile = readProxiesFromFile;
