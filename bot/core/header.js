const app = require("../config/app");

const headers = {
    accept: "*/*",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "en-US,en;q=0.9",
    "Content-Type": "application/json",
    origin: app.origin,
    referer: app.referer,
    "Sec-Ch-Ua": '"Chromium";v="128", "Not;A=Brand";v="24", "Android WebView";v="128"',
    "Sec-Ch-Ua-Mobile": "?1",
    "Sec-Ch-Ua-Platform": '"Android"',
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Linux; Android 13; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.6613.146 Mobile Safari/537.36",
    'X-Requested-With': 'org.telegram.messenger'
};

module.exports = headers;