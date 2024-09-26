const logger = require("./logger");

class Parser {
  #parseQueryString(queryString) {
    let queryStringg = queryString;
    if (!queryString?.includes("=")) {
      queryStringg = decodeURIComponent(queryString);
    }
    let queryParams = {};
    let pairs = queryStringg.split("&");

    pairs.forEach((pair) => {
      let [key, value] = pair.split("=");
      queryParams[key] = value;
    });

    return queryParams;
  }

  #decodeUrlEncodedString(str) {
    return decodeURIComponent(str?.replace(/\+/g, " "));
  }

  /**
   * @param {string} queryString
   *
   * @returns {{ user: { id: number, username: string, phone: string, first_name: string, last_name: string, language_code: string, is_bot: boolean, allows_write_to_pm: boolean }, auth_date: number, hash: string, query_id: string }}
   */
  toJson(queryString) {
    try {
      const parsedQuery = this.#parseQueryString(queryString);
      const userField = this.#decodeUrlEncodedString(parsedQuery.user);
      const user = JSON.parse(userField);
      parsedQuery.user = user;
      parsedQuery.user.allows_write_to_pm = true;
      return parsedQuery;
    } catch (error) {
      logger.error("Error while parsing query string: " + error.message);
      return null;
    }
  }

  toQueryString(json) {
    let encodedString = Object.keys(json)
      .map((key) => {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(
          typeof json[key] === "object" ? JSON.stringify(json[key]) : json[key]
        );
        return `${encodedKey}=${encodedValue}`;
      })
      .join("&");

    return encodedString;
  }
}

const parser = new Parser();

module.exports = parser;
