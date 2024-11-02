const register = require("../core/register");
const logger = require("./logger");
const { select } = require("@inquirer/prompts");
const fs = require("fs");
const path = require("path");
const settings = require("../config/config");
const proxies = require("../config/proxies");
const { program, Option } = require("commander");
const { TelegramClient } = require("telegram");
const Tapper = require("../core/tapper");
const { StringSession } = require("telegram/sessions");
const logger2 = require("./TldLogger");
const os = require("os");
const sleep = require("./sleep");
const _ = require("lodash");
const proxiesConvertor = require("./proxiesConvertor");
const NonSessionTapper = require("../core/nonSessionTapper");

class Luncher {
  #start_text;
  constructor() {
    this.#start_text = `
╔═╗╔═╗             ╔═══╗  ╔══╗      ╔╗ 
║║╚╝║║             ║╔══╝  ║╔╗║     ╔╝╚╗
║╔╗╔╗║╔══╗╔╗╔╗╔══╗ ║╚══╗╔╗║╚╝╚╗╔══╗╚╗╔╝
║║║║║║║╔╗║║╚╝║║╔╗║ ║╔══╝╠╣║╔═╗║║╔╗║ ║║ 
║║║║║║║║═╣║║║║║║═╣╔╝╚╗  ║║║╚═╝║║╚╝║ ║╚╗
╚╝╚╝╚╝╚══╝╚╩╩╝╚══╝╚══╝  ╚╝╚═══╝╚══╝ ╚═╝

© Freddy Bots   

`;
  }

  #printStartText() {
    logger.info(
      `Detected <lb>${this.#get_sessions().length}</lb> sessions | <pi>${
        this.#get_proxies() && Array.isArray(this.#get_proxies())
          ? this.#get_proxies().length
          : 0
      }</pi> proxies`
    );
    logger.paragraph(
      `<ye><u><b>WARNING</b></u></ye> <br />
<b><bl>en:</bl></b> NOT FOR SALE
<b><bl>ru:</bl></b> НЕ ДЛЯ ПРОДАЖИ
<b><bl>es:</bl></b> NO VENTA
<b><bl>fr:</bl></b> PAS À VENDRE
<b><bl>it:</bl></b> NON PER VENDITA
<b><bl>gh:</bl></b> YƐN TƆN

<b>For updates and more bots join us:</b> 
<la>https://t.me/freddy_bots</la>
`
    );
    console.log(this.#start_text);
  }
  async process() {
    let action;
    program
      .addOption(
        new Option("--action <action>", "Action type").choices(["1", "2", "3"])
      )
      .showHelpAfterError(true);

    program.parse();
    const options = program.opts();
    action = options ? parseInt(options.action) : null;
    if (!action) {
      this.#printStartText(); // print start text
      let userInput = "";

      while (true) {
        userInput = await select({
          message: "What would you like to do:\n",
          choices: [
            {
              name: "Create session",
              value: "1",
              description: "\nCreate a new session for the bot",
            },
            {
              name: "Run bot with sessions",
              value: "2",
              description: "\nStart the bot",
            },
            {
              name: "Run bot with query ids",
              value: "3",
              description: "\nStart the bot",
            },
          ],
        });

        if (!userInput.trim().match(/^[1-3]$/)) {
          logger.warning("Action must be 1 or 2 or 3");
        } else {
          break;
        }
      }

      action = parseInt(userInput.trim());
    }

    if (action === 1) {
      register.start();
    } else if (action === 2) {
      const tgClients = await this.#get_tg_clients();
      await this.#run_tasks(tgClients);
    } else if (action === 3) {
      await this.#run_tasks_query();
    }
  }

  async #get_tg_clients() {
    const sessions = this.#get_sessions();
    const tgClients = sessions.map((session) => {
      try {
        const sessionContent = fs.readFileSync(
          path.join(process.cwd(), "sessions", session + ".session"),
          "utf8"
        );
        if (!sessionContent) {
          logger.error(
            `<la><b>${session}</b></la> | Session is empty or expired. Create a new one.`
          );
          return;
        }

        const sessionData = JSON.parse(sessionContent);

        if (!settings.API_ID || !settings.API_HASH) {
          logger.error("API_ID and API_HASH must be provided.");
          process.exit(1);
        }

        if (
          !sessionData.sessionString ||
          !sessionData.apiId ||
          !sessionData.apiHash
        ) {
          logger.error(
            `<la><b>${session}</b></la> | Invalid session data. Create a new one.`
          );
          process.exit(1);
        }

        if (!/^\d+$/.test(sessionData.apiId)) {
          logger.error(
            `<la><b>${session}</b></la> | Invalid session data. Create a new one.`
          );
          process.exit(1);
        }
        const sessionString = new StringSession(sessionData.sessionString);
        const tg_client = new TelegramClient(
          sessionString,
          sessionData.apiId,
          sessionData.apiHash,
          {
            connectionRetries: 5,
            deviceModel: "Freddy Bots - " + os.type(),
            appVersion: "1.0.0",
            systemVersion: "1.0.0",
            langCode: "en",
            baseLogger: logger2,
          }
        );
        return {
          tg_client,
          session_name: session,
        };
      } catch (error) {
        logger.error(`<la><b>${session}</b></la> | Error: ${error.message}`);
      }
    });
    return tgClients;
  }

  #get_sessions() {
    const filePath = path.join(process.cwd(), "sessions");
    if (!fs.existsSync(filePath)) {
      return [];
    }
    //open the sessions folder and the total number files in it
    const sessions = fs.readdirSync(filePath).map((file) => {
      const sessionsName = file.endsWith(".session")
        ? file.split(".")[0]
        : null;
      return sessionsName;
    });
    return sessions;
  }

  #get_proxies() {
    if (!settings.USE_PROXY_FROM_JS_FILE && !settings.USE_PROXY_FROM_TXT_FILE) {
      return null;
    }
    if (settings.USE_PROXY_FROM_JS_FILE && settings.USE_PROXY_FROM_TXT_FILE) {
      logger.error(
        "You can't use both USE_PROXY_FROM_JS_FILE and USE_PROXY_FROM_TXT_FILE"
      );
      process.exit(1);
    }

    if (settings.USE_PROXY_FROM_TXT_FILE) {
      try {
        const proxiesArray = proxiesConvertor.readProxiesFromFile();
        return proxiesConvertor(proxiesArray);
      } catch (error) {
        logger.error(`Error reading file: ${error.message}`);
        process.exit(1);
      }
    }
    return proxies;
  }

  async #run_tasks(tgClients) {
    if (_.isEmpty(tgClients) || _.size(tgClients) < 1) {
      logger.error("No sessions found. Create a new session.");
      process.exit(1);
    }
    const proxies = this.#get_proxies();
    let proxiesCycle = proxies ? proxies[Symbol.iterator]() : null;

    if (settings.USE_NON_THREAD) {
      const pLimit = (await import("p-limit")).default;
      if (settings.MAX_CONCURRENT_ACCOUNT > 5) {
        console.log("\n");
        logger.warning(
          `<ye>[memefi]</ye> | MAX_CONCURRENT_ACCOUNT greater than 5 may cause 403 errors while running the bot\n`
        );
        const userInput = await select({
          message: "Do you want to continue with the bot?",
          choices: [
            {
              name: "Yes",
              value: "1",
              description: "\nContinue with the bot",
            },
            {
              name: "No",
              value: "2",
              description: "\nQuit the bot",
            },
          ],
        });

        if (userInput.trim().match(/^[1-2]$/)) {
          const action = parseInt(userInput.trim());
          if (action === 2) {
            process.exit(1);
          }
        }
      }
      const limit = pLimit(settings.MAX_CONCURRENT_ACCOUNT); // Limit to 2 concurrent executions
      const tasks = tgClients.map(async (tgClient, index) => {
        return limit(async () => {
          const proxy = proxiesCycle ? proxiesCycle.next().value : null;
          try {
            const sleeping = _.random(
              settings.DELAY_BETWEEN_STARTING_BOT[0],
              settings.DELAY_BETWEEN_STARTING_BOT[1]
            );
            logger.info(
              `<ye>[memefi]</ye> | ${tgClient.session_name} | Sleeping ${sleeping} seconds before starting the bot`
            );
            await sleep(sleeping);
            await new Tapper(tgClient).run(proxy);
          } catch (error) {
            logger.error(`Error in task for tg_client: ${error.message}`);
          }
        });
      });
      // Wait for all tasks to complete
      await Promise.all(tasks);

      const sleep_thread = _.random(
        settings.SLEEP_BETWEEN_NON_THREADS[0],
        settings.SLEEP_BETWEEN_NON_THREADS[1]
      );

      logger.info(
        `<ye>[memefi]</ye> | All threads completed | Sleeping ${sleep_thread} seconds before rerunning threads again`
      );

      await sleep(sleep_thread);
      // Rerun the tasks again
      await this.#run_tasks(tgClients);
    } else {
      const tasks = tgClients.map(async (tgClient, index) => {
        const proxy = proxiesCycle ? proxiesCycle.next().value : null;
        try {
          const sleeping = _.random(
            settings.DELAY_BETWEEN_STARTING_BOT[0],
            settings.DELAY_BETWEEN_STARTING_BOT[1]
          );
          logger.info(
            `<ye>[memefi]</ye> | ${tgClient.session_name} | Sleeping ${sleeping} seconds before starting the bot`
          );
          await sleep(sleeping);
          await new Tapper(tgClient).run(proxy);
        } catch (error) {
          logger.error(`Error in task for tg_client: ${error.message}`);
        }
      });
      await Promise.all(tasks);
    }
  }

  async #run_tasks_query() {
    const proxies = this.#get_proxies();
    let proxiesCycle = proxies ? proxies[Symbol.iterator]() : null;
    const queryPath = path.join(process.cwd(), "queryIds.json");
    if (!fs.existsSync(queryPath)) {
      logger.error(
        "queryIds.json file is not missing in the current directory. Please add it and try again."
      );
      process.exit(1);
    }
    const query_ids = require(queryPath);
    const queries = Object.entries(query_ids);
    if (!queries || _.isEmpty(queries)) {
      logger.error(
        "queryIds.json file is empty. Add some query ids and try again."
      );
      process.exit(1);
    }
    if (settings.USE_NON_THREAD) {
      const pLimit = (await import("p-limit")).default;
      if (settings.MAX_CONCURRENT_ACCOUNT > 5) {
        console.log("\n");
        logger.warning(
          `<ye>[memefi]</ye> | MAX_CONCURRENT_ACCOUNT greater than 5 may cause 403 errors while running the bot\n`
        );
        const userInput = await select({
          message: "Do you want to continue?",
          choices: [
            {
              name: "Yes",
              value: "1",
              description: "\nContinue with the bot",
            },
            {
              name: "No",
              value: "2",
              description: "\nQuit the bot",
            },
          ],
        });

        if (userInput.trim().match(/^[1-2]$/)) {
          const action = parseInt(userInput.trim());
          if (action === 2) {
            process.exit(1);
          }
        }
      }
      const limit = pLimit(settings.MAX_CONCURRENT_ACCOUNT); // Limit to 2 concurrent executions
      const tasks = queries?.map(async ([query_name, query_id], index) => {
        return limit(async () => {
          const proxy = proxiesCycle ? proxiesCycle.next().value : null;
          try {
            const sleeping = _.random(
              settings.DELAY_BETWEEN_STARTING_BOT[0],
              settings.DELAY_BETWEEN_STARTING_BOT[1]
            );
            logger.info(
              `<ye>[memefi]</ye> | ${query_name} | Sleeping ${sleeping} seconds before starting the bot`
            );
            await sleep(sleeping);
            await new NonSessionTapper(query_id, query_name).run(proxy);
          } catch (error) {
            logger.error(`Error in task for query_id: ${error.message}`);
          }
        });
      });

      // Wait for all tasks to complete
      await Promise.all(tasks);

      const sleep_thread = _.random(
        settings.SLEEP_BETWEEN_NON_THREADS[0],
        settings.SLEEP_BETWEEN_NON_THREADS[1]
      );

      logger.info(
        `<ye>[memefi]</ye> | All threads completed | Sleeping ${sleep_thread} seconds before rerunning threads again`
      );

      await sleep(sleep_thread);

      // Rerun the tasks again
      await this.#run_tasks_query();
    } else {
      const tasks = queries?.map(async ([query_name, query_id], index) => {
        const proxy = proxiesCycle ? proxiesCycle.next().value : null;
        try {
          const sleeping = _.random(
            settings.DELAY_BETWEEN_STARTING_BOT[0],
            settings.DELAY_BETWEEN_STARTING_BOT[1]
          );
          logger.info(
            `<ye>[memefi]</ye> | ${query_name} | Sleeping ${sleeping} seconds before starting the bot`
          );
          await sleep(sleeping);
          await new NonSessionTapper(query_id, query_name).run(proxy);
        } catch (error) {
          logger.error(`Error in task for query_id: ${error.message}`);
        }
      });
      await Promise.all(tasks);
    }
  }
}
const luncher = new Luncher();
module.exports = luncher;
