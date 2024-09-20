const app = require("../config/app");

const headers = {
  "content-type": "application/json",
  accept: "*/*",
  "sec-fetch-site": "same-site",
  "accept-encoding": "gzip, deflate",
  "accept-language": "en-US,en;q=0.9",
  "sec-fetch-mode": "cors",
  "sec-ch-ua-mobile": "?1",
  origin: app.origin,
  "user-agent":
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
  "sec-fetch-dest": "empty",
  "x-requested-with": "org.telegram.messenger.web",
  priority: "u=1, i",
  referer: "https://tg-app.memefi.club/",
};

module.exports = headers;
