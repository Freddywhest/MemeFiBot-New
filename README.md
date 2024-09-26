> [<img src="https://img.shields.io/badge/Telegram-%40Me-orange">](https://t.me/roddyfred)

# Use Node.Js 18 or 20

## Functionality

| Functional                                                     | Supported |
| -------------------------------------------------------------- | :-------: |
| Purchasing TapBot                                              |    ✅     |
| Starting TapBot                                                |    ✅     |
| Claiming TapBot reward every 3 hours                           |    ✅     |
| Claiming Daily Combo                                           |    ✅     |
| Claiming Tasks                                                 |    ✅     |
| Spinning game                                                  |    ✅     |
| User Agent for each session                                    |    ✅     |
| Multithreading                                                 |    ✅     |
| Binding a proxy to a session                                   |    ✅     |
| Auto-purchase of items if you have coins (tap, energy, charge) |    ✅     |
| Random sleep time between clicks                               |    ✅     |
| Random number of clicks per request                            |    ✅     |
| Caching session data                                           |    ✅     |
| Using a session/query_id                                       |    ✅     |
| Binding a proxy to a session/query_id                          |    ✅     |

### [How to add query id](https://github.com/Freddywhest/RockyRabbitBot/blob/main/AddQueryId.md)

## [Settings](https://github.com/FreddyWhest/MemeFiBot-New/blob/main/.env-example)

| Settings                        | Description                                                                                                     |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **API_ID / API_HASH**           | Platform data from which to launch a Telegram session (stock - Android)                                         |
| **MIN_AVAILABLE_ENERGY**        | Minimum amount of available energy, upon reaching which there will be a delay (eg 100)                          |
| **AUTO_UPGRADE_DAMAGE**         | Should I improve the tap (True / False)                                                                         |
| **MAX_DAMAGE_LEVEL**            | Maximum level of tap pumping (eg 5)                                                                             |
| **AUTO_UPGRADE_ENERGY**         | Should I improve the tap (True / False)                                                                         |
| **MAX_ENERGY_LEVEL**            | Maximum level of tap pumping (eg 5)                                                                             |
| **AUTO_UPGRADE_RECHARGE**       | Should I improve the tap (True / False)                                                                         |
| **MAX_RECHARGE_LEVEL**          | Maximum level of tap pumping (eg 5)                                                                             |
| **AUTO_APPLY_TURBO**            | Whether to use the daily free energy boost (True / False)                                                       |
| **AUTO_APPLY_ENERGY**           | Whether to use the daily free turbo boost (True / False)                                                        |
| **RANDOM_TAPS**                 | Random number of taps (eg [50,200])                                                                             |
| **RANDOM_TURBO_TAPS**           | Random number of turbo taps (eg [50,200])                                                                       |
| **SLEEP_BETWEEN_REQUESTS**      | Random delay between requests in seconds (eg [10,26])                                                           |
| **DELAY_BETWEEN_TURBO**         | Random delay between turbo taps in seconds (eg [10,26])                                                         |
| **DELAY_BETWEEN_TAPS**          | Random delay between taps in seconds (eg [10,26])                                                               |
| **DELAY_BETWEEN_TASKS**         | Random delay between tasks in seconds (eg [10,26])                                                              |
| **DELAY_BETWEEN_STARTING_BOT**  | Random delay between starting bot (eg [10,26])                                                                  |
| **AUTO_BUY_TAPBOT**             | Whether to purchase tapbot automatically (True / False)                                                         |
| **AUTO_SPIN**                   | Whether to spin automatically (True / False)                                                                    |
| **AUTO_COMPLETE_TASKS**         | Whether to should claim tasks (True / False)                                                                    |
| **AUTO_CLAIM_AND_START_TAPBOT** | Whether the bot should to claim and start tapbot (True / False)                                                 |
| **USE_PROXY_FROM_JS_FILE**      | Whether to use proxy from the `bot/config/proxies.js` file (True / False)                                       |
| **USE_PROXY_FROM_TXT_FILE**     | Whether to use proxy from the `bot/config/proxies.txt` file (True / False)                                      |
| **USE_REGISTRATION_PROXY**      | Whether to use proxy from the `bot/config/registrationProxy.js` file when creating a new session (True / False) |

## Installation

You can download [**Repository**](https://github.com/FreddyWhest/MemeFiBot-New) by cloning it to your system and installing the necessary dependencies:

```shell
~ >>> git clone https://github.com/FreddyWhest/MemeFiBot-New.git
~ >>> cd MemeFiBot-New

#Linux and MocOS
~/MemeFiBot-New >>> chmod +x check_node.sh
~/MemeFiBot-New >>> ./check_node.sh

OR

~/MemeFiBot-New >>> npm install
~/MemeFiBot-New >>> cp .env-example .env
~/MemeFiBot-New >>> nano .env # Here you must specify your API_ID and API_HASH , the rest is taken by default
~/MemeFiBot-New >>> node index.js

#Windows
1. Double click on INSTALL.bat in MemeFiBot-New directory to install the dependencies
2. Double click on START.bat in MemeFiBot-New directory to start the bot

OR

~/MemeFiBot-New >>> npm install
~/MemeFiBot-New >>> cp .env-example .env
~/MemeFiBot-New >>> # Specify your API_ID and API_HASH, the rest is taken by default
~/MemeFiBot-New >>> node index.js
```

Also for quick launch you can use arguments, for example:

```shell
~/MemeFiBot-New >>> node index.js --action=1

OR

~/MemeFiBot-New >>> node index.js --action=2 # For session
OR

~/MemeFiBot-New >>> node index.js --action=3 # For query id

#1 - Create session
#2 - Run clicker
```
