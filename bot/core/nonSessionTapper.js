const logger = require("../utils/logger");
const headers = require("./header");
const settings = require("../config/config");
const user_agents = require("../config/userAgents");
const fs = require("fs");
const sleep = require("../utils/sleep");
const ApiRequest = require("./api");
var _ = require("lodash");
const parser = require("../utils/parser");
const path = require("path");
const moment = require("moment");
const _isArray = require("../utils/_isArray");
const fdy = require("fdy-scraping");
const { UpgradableBoostType, FreeBoostType } = require("../utils/boost");
const { calculatePrice, generateVectorArray } = require("../utils/helper");

class NonSessionTapper {
  constructor(query_id, query_name) {
    this.bot_name = "memefi";
    this.session_name = query_name;
    this.query_id = query_id;
    this.session_user_agents = this.#load_session_data();
    this.headers = { ...headers, "user-agent": this.#get_user_agent() };
    this.api = new ApiRequest(this.session_name, this.bot_name);
  }

  #load_session_data() {
    try {
      const filePath = path.join(process.cwd(), "session_user_agents.json");
      const data = fs.readFileSync(filePath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        return {};
      } else {
        throw error;
      }
    }
  }

  #get_random_user_agent() {
    const randomIndex = Math.floor(Math.random() * user_agents.length);
    return user_agents[randomIndex];
  }

  #get_user_agent() {
    if (this.session_user_agents[this.session_name]) {
      return this.session_user_agents[this.session_name];
    }

    logger.info(
      `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Generating new user agent...`
    );
    const newUserAgent = this.#get_random_user_agent();
    this.session_user_agents[this.session_name] = newUserAgent;
    this.#save_session_data(this.session_user_agents);
    return newUserAgent;
  }

  #save_session_data(session_user_agents) {
    const filePath = path.join(process.cwd(), "session_user_agents.json");
    fs.writeFileSync(filePath, JSON.stringify(session_user_agents, null, 2));
  }

  async #get_tg_web_data() {
    try {
      const data = parser.toJson(this.query_id);
      const platform = this.#get_platform(this.#get_user_agent());
      if (
        _.isUndefined(data?.user?.username) ||
        _.isNull(data?.user?.username)
      ) {
        logger.paragraph(
          `Set username for query id name <la>${this.session_name}</la> before running the bot and \nfollow the below steps after you are done setting the username:\n\n1. Delete the cache folder\n2. Restart the bot`
        );
        process.exit(1);
      }
      const userString = JSON.stringify(data?.user);
      return {
        webAppData: {
          auth_date: Number(data?.auth_date),
          hash: data?.hash,
          query_id: data?.query_id,
          checkDataString: `auth_date=${data.auth_date}\nquery_id=${data.query_id}\nuser=${userString}`,
          user: { ...data?.user, version: "7.6", platform },
        },
      };
    } catch (error) {
      logger.error(
        `<ye>[${this.bot_name}]</ye> | ${this.session_name} | ❗️Unknown error during Authorization: ${error}`
      );
      throw error;
    } finally {
      /* await this.tg_client.disconnect(); */
      await sleep(1);
      logger.info(
        `<ye>[${this.bot_name}]</ye> | ${this.session_name} | 🚀 Starting bot...`
      );
    }
  }

  async #check_proxy(http_client, proxy) {
    try {
      const response = await http_client.get("https://httpbin.org/ip");
      const ip = response.data.origin;
      logger.info(
        `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Proxy IP: ${ip}`
      );
    } catch (error) {
      if (
        error.message.includes("ENOTFOUND") ||
        error.message.includes("getaddrinfo") ||
        error.message.includes("ECONNREFUSED")
      ) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error: Unable to resolve the proxy address. The proxy server at ${proxy.ip}:${proxy.port} could not be found. Please check the proxy address and your network connection.`
        );
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | No proxy will be used.`
        );
      } else {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Proxy: ${proxy.ip}:${proxy.port} | Error: ${error.message}`
        );
      }

      return false;
    }
  }
  async #set_new_boss(http_client) {
    const set_new_boss = await this.api.set_next_boss(http_client);
    if (
      !_.isEmpty(set_new_boss) &&
      !_.isNull(set_new_boss) &&
      !_.isUndefined(set_new_boss)
    ) {
      logger.success(
        `<ye>[${this.bot_name}]</ye> | ${this.session_name} | 🎯 New boss set | Boss level: <la>${set_new_boss?.currentBoss?.level}</la> | Boss health: <vo>${set_new_boss?.currentBoss?.currentHealth}</vo>`
      );
      return set_new_boss;
    } else {
      logger.error(
        `<ye>[${this.bot_name}]</ye> | ${this.session_name} | ❗️Error setting new boss`
      );
      return null;
    }
  }
  #get_platform(userAgent) {
    const platformPatterns = [
      { pattern: /iPhone/i, platform: "ios" },
      { pattern: /Android/i, platform: "android" },
      { pattern: /iPad/i, platform: "ios" },
    ];

    for (const { pattern, platform } of platformPatterns) {
      if (pattern.test(userAgent)) {
        return platform;
      }
    }

    return "Unknown";
  }

  async run(proxy, index) {
    let http_client;
    let access_token_created_time = 0;
    let profile_data;
    let game_config;
    let tapbot_config;

    if (
      (settings.USE_PROXY_FROM_TXT_FILE || settings.USE_PROXY_FROM_JS_FILE) &&
      proxy
    ) {
      http_client = fdy.create({
        headers: this.headers,
        proxy,
      });
      const proxy_result = await this.#check_proxy(http_client, proxy);
      if (!proxy_result) {
        http_client = fdy.create({
          headers: this.headers,
        });
      }
    } else {
      http_client = fdy.create({
        headers: this.headers,
      });
    }
    while (true) {
      try {
        const currentTime = _.floor(Date.now() / 1000);
        if (currentTime - access_token_created_time >= 3600) {
          const platform = this.#get_platform(this.#get_user_agent());
          const tg_web_data = await this.#get_tg_web_data();
          if (
            _.isNull(tg_web_data) ||
            _.isUndefined(tg_web_data) ||
            !tg_web_data ||
            _.isEmpty(tg_web_data)
          ) {
            continue;
          }
          http_client.defaults.headers[
            "sec-ch-ua"
          ] = `"Not)A;Brand";v="99", "${platform} WebView";v="127", "Chromium";v="127"`;
          http_client.defaults.headers["sec-ch-ua-platform"] = platform;
          const access_token = await this.api.get_access_token(
            http_client,
            tg_web_data
          );
          if (
            _.isNull(access_token) ||
            _.isUndefined(access_token) ||
            _.isEmpty(access_token) ||
            _.isUndefined(access_token?.access_token)
          ) {
            continue;
          }
          http_client.defaults.headers[
            "authorization"
          ] = `Bearer ${access_token?.access_token}`;
          access_token_created_time = currentTime;
          await sleep(_.random(2, 6));
        }

        profile_data = await this.api.profile_data(http_client);
        game_config = await this.api.game_data(http_client);
        tapbot_config = await this.api.tapbot_config(http_client);
        if (
          _.isEmpty(profile_data) ||
          _.isEmpty(game_config) ||
          _.isEmpty(tapbot_config)
        ) {
          continue;
        }
        let current_boss = game_config?.currentBoss;
        let balance = game_config?.coinsAmount;
        let nonce = game_config?.nonce;
        let current_boss_level = current_boss?.level;
        let boss_max_health = current_boss?.maxHealth;
        let boss_current_health = current_boss?.currentHealth;
        let available_energy = game_config?.currentEnergy;
        let free_boosts = game_config?.freeBoosts;
        let turbo_boost_count = free_boosts?.currentTurboAmount;
        let energy_boost_count = free_boosts?.currentRefillEnergyAmount;
        let tap_level = game_config?.weaponLevel;
        let energy_level = game_config?.energyLimitLevel;
        let charge_level = game_config?.energyRechargeLevel;
        let spin_energy_total = game_config?.spinEnergyTotal;
        let max_energy = game_config?.maxEnergy;

        logger.info(
          `<ye>[${this.bot_name}]</ye> | ${
            this.session_name
          } | Current boss level: <pi>${current_boss_level}</pi> | Boss health: <la>${Number(
            boss_current_health
          ).toLocaleString()}</la> out of <bl>${Number(
            boss_max_health
          ).toLocaleString()}</bl>`
        );
        logger.info(
          `<ye>[${this.bot_name}]</ye> | ${
            this.session_name
          } | Balance: <vo>${Number(
            balance
          ).toLocaleString()}</vo> | Available energy: <la>${Number(
            available_energy
          ).toLocaleString()}</la>`
        );
        if (_.lte(boss_current_health, 0)) {
          const new_boss = await this.#set_new_boss(http_client);
          if (
            !_.isEmpty(new_boss) &&
            !_.isNull(new_boss) &&
            !_.isUndefined(new_boss)
          ) {
            game_config = new_boss;
            balance = game_config?.coinsAmount;
            boss_current_health = game_config?.currentBoss?.currentHealth;
            await sleep(_.random(15, 30));
          } else {
            continue;
          }
        }

        let spinning_count = 0;
        let retries = 0;
        while (
          _.gt(spin_energy_total, 0) &&
          _.lt(spinning_count, 10) &&
          settings.AUTO_SPIN
        ) {
          const spin_sleep = _.add(
            sleep.generateDelays(10)[_.random(0, 9)],
            _.random(12, 30)
          );
          logger.info(
            `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Sleeping for ${spin_sleep} seconds before spinning slot machine`
          );

          await sleep(spin_sleep);
          //spin slot machine
          if (_.lte(boss_current_health, 0)) {
            const new_boss = await this.#set_new_boss(http_client);
            if (
              !_.isEmpty(new_boss) &&
              !_.isNull(new_boss) &&
              !_.isUndefined(new_boss)
            ) {
              game_config = new_boss;
              balance = game_config?.coinsAmount;
              boss_current_health = game_config?.currentBoss?.currentHealth;
              await sleep(_.random(14, 23));
            } else {
              break;
            }
          }
          const spin_count = _.gte(spin_energy_total, 150)
            ? 150
            : _.gte(spin_energy_total, 50)
            ? 50
            : _.gte(spin_energy_total, 10)
            ? 10
            : _.gte(spin_energy_total, 5)
            ? 5
            : _.gte(spin_energy_total, 3)
            ? 3
            : 1;

          const spin_result = await this.api.spin_slot_machine(
            http_client,
            spin_count
          );

          if (_.isString(spin_result) && spin_result.includes("retry")) {
            retries++;
            logger.warning(
              `<ye>[${this.bot_name}]</ye> | ${this.session_name} | 🔄 Retrying... | Total Retries: <la>${retries}</la> | Max Retries: <bl>3</bl> | Sleeping for 5 seconds...`
            );
            if (retries >= 3) {
              break;
            }
            await sleep(_.random(2, 5));
            continue;
          }
          if (
            _.isEmpty(spin_result) ||
            _.isNull(spin_result) ||
            _.isUndefined(spin_result) ||
            _.isEmpty(spin_result?.gameConfig) ||
            _.isNull(spin_result?.gameConfig) ||
            _.isUndefined(spin_result?.gameConfig) ||
            _.isNull(spin_result?.spinResults) ||
            _.isEmpty(spin_result?.spinResults) ||
            _.isUndefined(spin_result?.spinResults)
          ) {
            break;
          }

          game_config = spin_result?.gameConfig;
          spin_energy_total = game_config?.spinEnergyTotal;
          boss_current_health = game_config?.currentBoss?.currentHealth;
          const progress_bar_reward = spin_result?.progressBarReward;
          const spin_result_array = spin_result?.spinResults;

          if (!_.isEmpty(spin_result_array)) {
            logger.info(
              `<ye>[${this.bot_name}]</ye> | ${this.session_name} | 🎰 Spin energy used: <pi>${spin_count}</pi> | Spin energy left: <la>${spin_energy_total}</la> | Spin rewards:`
            );
            spin_result_array?.forEach((item, index) => {
              logger.success(
                `<ye>[${this.bot_name}]</ye> | ${
                  this.session_name
                } | 🎁 <la>No. ${index + 1}</la> Reward type: ${
                  item?.rewardType
                } | Reward amount: <pi>${
                  item?.rewardAmount
                }</pi> | Combination: <lb>${item?.combination?.join(", ")}</lb>`
              );
            });
          }

          if (!_.isEmpty(progress_bar_reward)) {
            logger.success(
              `<ye>[${this.bot_name}]</ye> | ${this.session_name} | 🎉 Progress bar reward claimed | Reward type: <la>${progress_bar_reward?.rewardType}</la> | Reward amount: <pi>${progress_bar_reward?.rewardAmount}</pi>`
            );
          }
          retries = 0;
          spinning_count++;
        }

        await sleep(_.random(2, 6));

        balance = game_config?.coinsAmount;

        if (
          tapbot_config?.isPurchased == false &&
          _.gte(balance, 200000) &&
          settings.AUTO_BUY_TAPBOT
        ) {
          const purchase_tapbot = await this.api.upgrade_boost(
            http_client,
            UpgradableBoostType.TAPBOT
          );
          if (
            !_.isEmpty(purchase_tapbot) &&
            !_.isNull(purchase_tapbot) &&
            !_.isUndefined(purchase_tapbot)
          ) {
            game_config = purchase_tapbot;
            balance = game_config?.coinsAmount;
            logger.success(
              `<ye>[${this.bot_name}]</ye> | ${
                this.session_name
              } | 🤖 Tapbot purchased | Balance: <vo>${Number(
                balance
              ).toLocaleString()}</vo>`
            );
          }
          await sleep(_.random(2, 6));
        }

        tapbot_config = await this.api.tapbot_config(http_client);

        if (
          tapbot_config?.isPurchased == true &&
          settings.AUTO_CLAIM_AND_START_TAPBOT
        ) {
          if (
            !_.isNull(tapbot_config?.endsAt) &&
            !_.isUndefined(tapbot_config?.endsAt) &&
            moment(tapbot_config?.endsAt).isBefore(moment())
          ) {
            const claim_tapbot = await this.api.claim_tapbot(http_client);
            if (
              !_.isEmpty(claim_tapbot) &&
              !_.isNull(claim_tapbot) &&
              !_.isUndefined(claim_tapbot)
            ) {
              tapbot_config = claim_tapbot;
              logger.success(
                `<ye>[${this.bot_name}]</ye> | ${this.session_name} | 🤖 Tapbot claimed succesfully`
              );
            }
          }

          if (
            _.isNull(tapbot_config?.endsAt) &&
            _.gt(tapbot_config?.totalAttempts, tapbot_config?.usedAttempts)
          ) {
            const start_tapbot = await this.api.start_tapbot(http_client);
            if (
              !_.isEmpty(start_tapbot) &&
              !_.isNull(start_tapbot) &&
              !_.isUndefined(start_tapbot)
            ) {
              tapbot_config = start_tapbot;
              logger.success(
                `<ye>[${this.bot_name}]</ye> | ${this.session_name} | 🤖 Tapbot started succesfully`
              );
            }
          }
        }

        //turbo tapping
        free_boosts = game_config?.freeBoosts;
        turbo_boost_count = free_boosts?.currentTurboAmount;
        energy_boost_count = free_boosts?.currentRefillEnergyAmount;
        let turbo_apply_count = 0;

        while (
          _.gt(turbo_boost_count, 0) &&
          _.lte(turbo_apply_count, 5) &&
          settings.AUTO_APPLY_TURBO
        ) {
          const turbo_sleep = _.random(
            settings.DELAY_BETWEEN_TURBO[0],
            settings.DELAY_BETWEEN_TURBO[1]
          );
          logger.info(
            `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Sleeping ${turbo_sleep} seconds before applying turbo boost...`
          );
          await sleep(turbo_sleep);
          if (_.lte(boss_current_health, 0)) {
            const new_boss = await this.#set_new_boss(http_client);
            if (
              !_.isEmpty(new_boss) &&
              !_.isNull(new_boss) &&
              !_.isUndefined(new_boss)
            ) {
              game_config = new_boss;
              balance = game_config?.coinsAmount;
              boss_current_health = game_config?.currentBoss?.currentHealth;
              await sleep(_.random(10, 20));
              continue;
            } else {
              break;
            }
          }

          let turbo_taps;
          if (
            _.isInteger(settings.RANDOM_TURBO_TAPS[0]) &&
            _.isInteger(settings.RANDOM_TURBO_TAPS[1])
          ) {
            turbo_taps = _.random(
              settings.RANDOM_TURBO_TAPS[0],
              settings.RANDOM_TURBO_TAPS[1]
            );
          } else {
            turbo_taps = _.random(1000, 1500);
          }
          /* 🚀  */
          const apply_turbo = await this.api.apply_boost(
            http_client,
            FreeBoostType.TURBO
          );

          if (
            !_.isEmpty(apply_turbo) &&
            !_.isNull(apply_turbo) &&
            !_.isUndefined(apply_turbo)
          ) {
            game_config = apply_turbo;
            balance = game_config?.coinsAmount;
            turbo_boost_count = game_config?.freeBoosts?.currentTurboAmount;
            nonce = game_config?.nonce;
            boss_current_health = game_config?.currentBoss?.currentHealth;
            logger.success(
              `<ye>[${this.bot_name}]</ye> | ${this.session_name} | 🚀 Turbo boost applied`
            );
            await sleep(_.random(2, 6));
            const data = {
              payload: {
                nonce,
                tapsCount: turbo_taps,
                vector: generateVectorArray(turbo_taps),
              },
            };

            const old_balance = balance;

            if (_.lte(boss_current_health, 0)) {
              const new_boss = await this.#set_new_boss(http_client);
              if (
                !_.isEmpty(new_boss) &&
                !_.isNull(new_boss) &&
                !_.isUndefined(new_boss)
              ) {
                game_config = new_boss;
                balance = game_config?.coinsAmount;
                boss_current_health = game_config?.currentBoss?.currentHealth;
                await sleep(_.random(10, 20));
              } else {
                break;
              }
            }

            const tap_result = await this.api.send_taps(http_client, data);
            if (
              !_.isEmpty(tap_result) &&
              !_.isNull(tap_result) &&
              !_.isUndefined(tap_result)
            ) {
              game_config = tap_result;
              balance = game_config?.coinsAmount;
              const added_coins = _.subtract(balance, old_balance);
              boss_current_health = game_config?.currentBoss?.currentHealth;
              if (_.gt(added_coins, 0)) {
                logger.success(
                  `<ye>[${this.bot_name}]</ye> | ${
                    this.session_name
                  } | 🔨 Successful tapped | Balance: <pi>${Number(
                    balance
                  ).toLocaleString()}</pi> (<gr>+${Number(
                    added_coins
                  ).toLocaleString()}</gr>) | Boss health: <vo>${Number(
                    boss_current_health
                  ).toLocaleString()}</vo>`
                );
              } else {
                logger.success(
                  `<ye>[${this.bot_name}]</ye> | ${
                    this.session_name
                  } | 🔨 Successful tapped | Balance: <pi>${Number(
                    balance
                  ).toLocaleString()}</pi> | Boss health: <vo>${Number(
                    boss_current_health
                  ).toLocaleString()}</vo>`
                );
              }
            }
          } else {
            break;
          }
          turbo_apply_count++;
        }

        game_config = await this.api.game_data(http_client);
        balance = game_config?.coinsAmount;
        boss_current_health = game_config?.currentBoss?.currentHealth;
        available_energy = game_config?.currentEnergy;

        if (_.lte(boss_current_health, 0)) {
          const new_boss = await this.#set_new_boss(http_client);
          if (
            !_.isEmpty(new_boss) &&
            !_.isNull(new_boss) &&
            !_.isUndefined(new_boss)
          ) {
            game_config = new_boss;
            balance = game_config?.coinsAmount;
            boss_current_health = game_config?.currentBoss?.currentHealth;
            await sleep(_.random(10, 25));
          } else {
            break;
          }
        }

        //normal tapping
        let tap_count = 0;
        while (
          _.gt(available_energy, settings.MIN_AVAILABLE_ENERGY) &&
          _.lte(tap_count, 10)
        ) {
          const tap_sleep = _.random(
            settings.DELAY_BETWEEN_TAPS[0],
            settings.DELAY_BETWEEN_TAPS[1]
          );
          logger.info(
            `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Sleeping for ${tap_sleep} seconds before tapping...`
          );
          await sleep(tap_sleep);
          if (_.lte(boss_current_health, 0)) {
            const new_boss = await this.#set_new_boss(http_client);
            if (
              !_.isEmpty(new_boss) &&
              !_.isNull(new_boss) &&
              !_.isUndefined(new_boss)
            ) {
              game_config = new_boss;
              balance = game_config?.coinsAmount;
              boss_current_health = game_config?.currentBoss?.currentHealth;
              await sleep(_.random(15, 25));
            } else {
              break;
            }
          }
          let normal_taps;
          if (
            _.isInteger(settings.RANDOM_TAPS[0]) &&
            _.isInteger(settings.RANDOM_TAPS[1])
          ) {
            normal_taps = _.random(
              settings.RANDOM_TAPS[0],
              settings.RANDOM_TAPS[1]
            );
          } else {
            normal_taps = _.random(50, 200);
          }

          if (_.gt(normal_taps, _.divide(available_energy, tap_level))) {
            normal_taps = _.floor(_.divide(available_energy, tap_level));
          }

          nonce = game_config?.nonce;

          const data = {
            payload: {
              nonce,
              tapsCount: normal_taps,
              vector: generateVectorArray(normal_taps),
            },
          };

          const old_balance = balance;

          const tap_result = await this.api.send_taps(http_client, data);
          if (
            !_.isEmpty(tap_result) &&
            !_.isNull(tap_result) &&
            !_.isUndefined(tap_result)
          ) {
            game_config = tap_result;
            balance = game_config?.coinsAmount;
            available_energy = game_config?.currentEnergy;
            const added_coins = _.subtract(balance, old_balance);
            boss_current_health = game_config?.currentBoss?.currentHealth;
            energy_boost_count =
              game_config?.freeBoosts?.currentRefillEnergyAmount;
            if (added_coins > 0) {
              logger.success(
                `<ye>[${this.bot_name}]</ye> | ${
                  this.session_name
                } | 🔨 Successful tapped | Balance: <pi>${Number(
                  balance
                ).toLocaleString()}</pi> (<gr>+${Number(
                  added_coins
                ).toLocaleString()}</gr>) | Boss health: <vo>${Number(
                  boss_current_health
                ).toLocaleString()}</vo>`
              );
            } else {
              logger.info(
                `<ye>[${this.bot_name}]</ye> | ${
                  this.session_name
                } | 🔨 Successful tapped | Balance: <pi>${Number(
                  balance
                ).toLocaleString()}</pi> | Boss health: <vo>${Number(
                  boss_current_health
                ).toLocaleString()}</vo>`
              );
            }
          }

          if (
            settings.AUTO_APPLY_ENERGY &&
            _.gte(energy_boost_count, 1) &&
            _.lte(available_energy, _.divide(max_energy, 2))
          ) {
            logger.info(
              `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Sleeping for 5 seconds before applying energy boost...`
            );
            await sleep(_.random(5, 10));
            const apply_energy = await this.api.apply_boost(
              http_client,
              FreeBoostType.ENERGY
            );

            if (
              !_.isEmpty(apply_energy) &&
              !_.isNull(apply_energy) &&
              !_.isUndefined(apply_energy)
            ) {
              game_config = apply_energy;
              balance = game_config?.coinsAmount;
              available_energy = game_config?.currentEnergy;
              energy_boost_count =
                game_config?.freeBoosts?.currentRefillEnergyAmount;
              logger.success(
                `<ye>[${this.bot_name}]</ye> | ${this.session_name} | 🔋 Energy boost applied`
              );
            }
          }

          tap_count++;
        }

        let task_count = 0;
        //tasks
        if (settings.AUTO_COMPLETE_TASKS) {
          const campaigns = await this.api.get_campaigns(http_client);

          if (!_.isEmpty(campaigns)) {
            for (const campaign of campaigns) {
              if (_.gte(task_count, 10)) {
                break;
              }
              const get_tasks_list = await this.api.get_tasks_list(
                http_client,
                campaign?.id
              );

              const campaign_sleep = _.random(
                settings.DELAY_BETWEEN_TASKS[0],
                settings.DELAY_BETWEEN_TASKS[1]
              );
              logger.info(
                `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Sleeping for ${campaign_sleep} seconds before getting tasks...`
              );

              await sleep(campaign_sleep);

              if (!_.isEmpty(get_tasks_list)) {
                for (const task of get_tasks_list) {
                  if (task?.status?.toLowerCase() !== "verification") {
                    await sleep(_.random(5, 15));
                    await this.api.verify_campaign(http_client, task?.id);
                  }
                  const tasks_sleep = _.add(
                    sleep.generateDelays(get_tasks_list.length + 1)[
                      _.random(0, get_tasks_list.length - 1)
                    ],
                    _.random(10, 30)
                  );
                  logger.info(
                    `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Sleeping for ${campaign_sleep} seconds before verifying task...`
                  );

                  await sleep(tasks_sleep);

                  const get_task_by_id = await this.api.get_task_by_id(
                    http_client,
                    task?.id
                  );

                  if (!_.isEmpty(get_task_by_id)) {
                    const task_available_at = moment(
                      get_task_by_id?.verificationAvailableAt
                    ).diff(moment(), "seconds");
                    const sleep_time_task =
                      task_available_at > 0
                        ? task_available_at + 5
                        : _.random(5, 15);

                    logger.info(
                      `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Sleeping for ${sleep_time_task} seconds before claiming task...`
                    );

                    await sleep(sleep_time_task);

                    const claim_task = await this.api.complete_task(
                      http_client,
                      get_task_by_id?.userTaskId
                    );

                    if (!_.isEmpty(claim_task)) {
                      logger.success(
                        `<ye>[${this.bot_name}]</ye> | ${
                          this.session_name
                        } | Task claimed: <la>${
                          claim_task?.name
                        }</la> | Reward: <bl>${
                          claim_task?.coinsRewardAmount
                        }</bl> ${
                          claim_task?.spinEnergyRewardAmount > 0
                            ? `(<lb>+${claim_task?.spinEnergyRewardAmount} spin</lb>`
                            : ""
                        } )`
                      );
                    }
                  }
                }
              }
              task_count++;
            }
          }
        }

        if (
          _.gte(balance, calculatePrice(tap_level)) &&
          settings.AUTO_UPGRADE_DAMAGE &&
          _.lt(tap_level, settings.MAX_DAMAGE_LEVEL)
        ) {
          const upgrade_tap = await this.api.upgrade_boost(
            http_client,
            UpgradableBoostType.TAP
          );
          if (
            !_.isEmpty(upgrade_tap) &&
            !_.isNull(upgrade_tap) &&
            !_.isUndefined(upgrade_tap)
          ) {
            game_config = upgrade_tap;
            tap_level = game_config?.weaponLevel;
            balance = game_config?.coinsAmount;
            logger.success(
              `<ye>[${this.bot_name}]</ye> | ${
                this.session_name
              } | <gr>⬆️</gr> Tap upgraded to level <pi>${tap_level}</pi> | Balance: <vo>${Number(
                balance
              ).toLocaleString()}</vo>`
            );
          }
          await sleep(_.random(5, 15));
        }

        if (
          _.gte(balance, calculatePrice(energy_level)) &&
          settings.AUTO_UPGRADE_ENERGY &&
          _.lt(energy_level, settings.MAX_ENERGY_LEVEL)
        ) {
          const upgrade_energy = await this.api.upgrade_boost(
            http_client,
            UpgradableBoostType.ENERGY
          );
          if (
            !_.isEmpty(upgrade_energy) &&
            !_.isNull(upgrade_energy) &&
            !_.isUndefined(upgrade_energy)
          ) {
            game_config = upgrade_energy;
            energy_level = game_config?.energyLimitLevel;
            balance = game_config?.coinsAmount;
            logger.success(
              `<ye>[${this.bot_name}]</ye> | ${
                this.session_name
              } | <gr>⬆️</gr> Energy cap upgraded to level <pi>${energy_level}</pi> | Balance: <vo>${Number(
                balance
              ).toLocaleString()}</vo>`
            );
          }
          await sleep(_.random(5, 15));
        }

        if (
          _.gte(balance, calculatePrice(charge_level)) &&
          _.lt(charge_level, 3) &&
          settings.AUTO_UPGRADE_RECHARGE
        ) {
          const upgrade_charge = await this.api.upgrade_boost(
            http_client,
            UpgradableBoostType.CHARGE
          );
          if (
            !_.isEmpty(upgrade_charge) &&
            !_.isNull(upgrade_charge) &&
            !_.isUndefined(upgrade_charge)
          ) {
            game_config = upgrade_charge;
            charge_level = game_config?.energyRechargeLevel;
            balance = game_config?.coinsAmount;
            logger.success(
              `<ye>[${this.bot_name}]</ye> | ${
                this.session_name
              } | <gr>⬆️</gr> Recharging speed upgraded to level <pi>${charge_level}</pi> | Balance: <vo>${Number(
                balance
              ).toLocaleString()}</vo>`
            );
          }
          await sleep(_.random(5, 15));
        }
      } catch (error) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | ❗️Unknown error: ${error}`
        );
      } finally {
        let ran_sleep;
        if (_isArray(settings.SLEEP_BETWEEN_REQUESTS)) {
          if (
            _.isInteger(settings.SLEEP_BETWEEN_REQUESTS[0]) &&
            _.isInteger(settings.SLEEP_BETWEEN_REQUESTS[1])
          ) {
            ran_sleep = _.random(
              settings.SLEEP_BETWEEN_REQUESTS[0],
              settings.SLEEP_BETWEEN_REQUESTS[1]
            );
          } else {
            ran_sleep = _.random(450, 800);
          }
        } else if (_.isInteger(settings.SLEEP_BETWEEN_REQUESTS)) {
          const ran_add = _.random(20, 50);
          ran_sleep = settings.SLEEP_BETWEEN_REQUESTS + ran_add;
        } else {
          ran_sleep = _.random(450, 800);
        }

        logger.info(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Sleeping for ${ran_sleep} seconds...`
        );
        await sleep(ran_sleep);
      }
    }
  }
}
module.exports = NonSessionTapper;
