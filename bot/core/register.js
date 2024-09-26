const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const fs = require("fs");
const { input } = require("@inquirer/prompts");
const logger = require("../utils/logger");
const settings = require("../config/config");
require("dotenv").config();
const path = require("path");
const logger2 = require("../utils/TldLogger");
const devices = require("../utils/devices");
const { select } = require("@inquirer/prompts");
var qrcode = require("qrcode-terminal");
const readline = require("readline");
const os = require("os");
const registrationProxies = require("../config/registrationProxy");

class Register {
  #stringSession;
  #apiId;
  #apiHash;
  constructor() {
    this.#apiId = settings.API_ID;
    this.#apiHash = settings.API_HASH;
    this.#stringSession = new StringSession("");
  }

  async #getSessionName() {
    const filePath = path.join(process.cwd(), "sessions");
    let sessionsName = await input({
      message: "Please enter your session name: ",
    });
    do {
      if (fs.existsSync(`${filePath}/${sessionsName}.session`)) {
        logger.warning(`Session name ${sessionsName} already exists!`);
        sessionsName = await input({
          message: "Please enter a different session name: ",
        });
      }
    } while (fs.existsSync(`${filePath}/${sessionsName}.session`));
    return sessionsName;
  }

  #client() {
    const client = new TelegramClient(
      this.#stringSession,
      this.#apiId,
      this.#apiHash,
      {
        connectionRetries: 5,
        deviceModel: os.type() + " - Freddy Bots",
        appVersion: "1.0.0",
        systemVersion: "1.0.0",
        langCode: "en",
        baseLogger: logger2,
        proxy: settings.USE_REGISTRATION_PROXY
          ? {
              ip: registrationProxies.ip,
              port: registrationProxies.port,
              password: registrationProxies.password
                ? registrationProxies.password
                : undefined,
              username: registrationProxies.username
                ? registrationProxies.username
                : undefined,
            }
          : undefined,
      }
    );

    return client;
  }

  async #sign_in_with_phone(client) {
    await client.start({
      phoneNumber: async () =>
        await input({
          message: "Please enter your number: ",
        }),
      password: async () =>
        await input({
          message: "Please enter your password: ",
        }),
      phoneCode: async () =>
        await input({
          message: "Please enter the code you received: ",
        }),
      onError: (err) => console.error(err),
    });
  }

  async #sign_in_with_qr(client) {
    let qrCodeLines = 0;
    let message = "";
    await client.connect();
    let isShown = false;
    await client.signInUserWithQrCode(
      { apiId: this.#apiId, apiHash: this.#apiHash },
      {
        onError: (err) => console.error(err),
        qrCode: async (code) => {
          if (!isShown) {
            console.log(
              "\nScan QR code below with your telegram app to login: \n"
            );
            qrcode.generate(
              `tg://login?token=${code.token.toString("base64url")}`,
              { small: true },
              (qrcodeString) => {
                qrCodeLines = qrcodeString.split("\n").length; // Count the lines in the QR code
                console.log(qrcodeString);
              }
            );
            isShown = true;
          } else {
            if (message) {
              qrCodeLines = qrCodeLines + 2;
            }
            readline.moveCursor(process.stdout, 0, -qrCodeLines); // Adjust -6 based on the number of lines your QR code takes
            readline.clearScreenDown(process.stdout); // Clear everything below the cursor
            message = "\nNew qr code received\n";
            console.log(message);
            qrcode.generate(
              `tg://login?token=${code.token.toString("base64url")}`,
              { small: true },
              (qrcodeString) => {
                qrCodeLines = qrcodeString.split("\n").length + 2; // Count the lines in the QR code
                console.log(qrcodeString);
              }
            );
          }
        },
        password: async () =>
          await input({
            message: "Please enter your password: ",
          }),
      }
    );
  }

  async start() {
    const filePath = path.join(process.cwd(), "sessions");
    if (!this.#apiId || !this.#apiHash) {
      logger.error("API_ID and API_HASH must be provided.");
      process.exit(1);
    }

    if (typeof this.#apiHash !== "string" || typeof this.#apiId !== "number") {
      logger.error(
        "API_ID and API_HASH must be numbers and strings respectively."
      );
      process.exit(1);
    }

    const sessionsName = await this.#getSessionName();

    let userInput = "";

    while (true) {
      userInput = await select({
        message: "How do you want to create a new session:\n",
        choices: [
          {
            name: "With QR code",
            value: "1",
            description: "\nCreate a new session with QR code",
          },
          {
            name: "With phone number",
            value: "2",
            description: "\nCreate a new session with phone number",
          },
        ],
      });

      if (!userInput.trim().match(/^[1-2]$/)) {
        logger.warning("Action must be 1 or 2");
      } else {
        break;
      }
    }

    const action = parseInt(userInput.trim());

    if (action === 1) {
      await this.#sign_in_with_qr(this.#client());
    } else if (action === 2) {
      await this.#sign_in_with_phone(this.#client());
    }

    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath);
    }

    const sessionData = {
      apiId: this.#apiId,
      apiHash: this.#apiHash,
      sessionString: this.#stringSession.save(),
    };

    fs.writeFileSync(
      `${filePath}/${sessionsName}.session`,
      JSON.stringify(sessionData, null, 2)
    );

    logger.paragraph(
      `Session saved as <gr>${sessionsName}.session</gr> <br />
<u>Session device info: </u><br />
<b>OS:</b> <la>${os.type() || "N/A"}</la>
`
    );

    this.#client().disconnect();
    process.exit(0);
  }
}

const register = new Register();
module.exports = register;
