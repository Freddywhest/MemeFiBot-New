const moment = require("moment");

class Logger {
  constructor() {
    this.prefix = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]`;
    this.GREEN = "\u001b[32m";
    this.RED = "\u001b[31m";
    this.YELLOW = "\u001b[33m";
    this.BLUE = "\u001b[34m";
    this.VOILET = "\u001b[35m";
    this.LIGHT_BLUE = "\u001b[36m";
    this.WHITE = "\u001b[37m";
    this.PINK = "\u001b[38;5;201m";
    this.LAVENDER = "\u001b[38;5;147m";

    //Background colors
    this.BG_WHITE_CYAN = "\u001b[37;46m";
    this.BG_RED = "\u001b[37;41m";
    this.BG_GREEN = "\u001b[37;42m";
    this.BG_YELLOW = "\u001b[37;43m";
    this.BG_BLUE = "\u001b[37;44m";
    this.BG_LIGHT_BLUE = "\u001b[37;45m";
    this.BG_WHITE = "\u001b[47;45m";

    this.RESET = "\u001b[0m";
    this.BOLD = "\u001b[1m";
    this.ITALICIZE = "\u001b[3m";
    this.UNDERLINE = "\u001b[4m";
  }

  #convertHtmlElementToAnsiColor(message) {
    if (!message) {
      return message;
    }

    return (
      message
        // Text colors
        .replace(/<bl>/g, this.BLUE)
        .replace(/<\/bl>/g, this.RESET)
        .replace(/<re>/g, this.RED)
        .replace(/<\/re>/g, this.RESET)
        .replace(/<gr>/g, this.GREEN)
        .replace(/<\/gr>/g, this.RESET)
        .replace(/<ye>/g, this.YELLOW)
        .replace(/<\/ye>/g, this.RESET)
        .replace(/<pi>/g, this.PINK)
        .replace(/<\/pi>/g, this.RESET)
        .replace(/<wh>/g, this.WHITE)
        .replace(/<\/wh>/g, this.RESET)
        .replace(/<vo>/g, this.VOILET)
        .replace(/<\/vo>/g, this.RESET)
        .replace(/<la>/g, this.LAVENDER)
        .replace(/<\/la>/g, this.RESET)
        .replace(/<lb>/g, this.LIGHT_BLUE)
        .replace(/<\/lb>/g, this.RESET)

        // Text styles
        .replace(/<b>/g, this.BOLD)
        .replace(/<\/b>/g, this.RESET)
        .replace(/<i>/g, this.ITALICIZE)
        .replace(/<\/i>/g, this.RESET)
        .replace(/<u>/g, this.UNDERLINE)
        .replace(/<\/u>/g, this.RESET)

        // Background colors
        .replace(/<wcb>/g, this.BG_WHITE_CYAN)
        .replace(/<\/wcb>/g, this.RESET)
        .replace(/<reb>/g, this.BG_RED)
        .replace(/<\/reb>/g, this.RESET)
        .replace(/<grb>/g, this.BG_GREEN)
        .replace(/<\/grb>/g, this.RESET)
        .replace(/<yeb>/g, this.BG_YELLOW)
        .replace(/<\/yeb>/g, this.RESET)
        .replace(/<blb>/g, this.BG_BLUE)
        .replace(/<\/blb>/g, this.RESET)
        .replace(/<lbb>/g, this.BG_LIGHT_BLUE)
        .replace(/<\/lbb>/g, this.RESET)
        .replace(/<whb>/g, this.BG_WHITE)
        .replace(/<\/whb>/g, this.RESET)

        // HTML tags
        .replace(/<br>/g, "\n")
        .replace(/<br \/>/g, "\n")
    );
  }

  info(message) {
    this.prefix = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]`;
    console.log(
      this.#convertHtmlElementToAnsiColor(
        `${this.prefix} | <bl>INFO</bl> | ${message}`
      )
    );
  }

  warning(message) {
    this.prefix = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]`;
    console.log(
      this.#convertHtmlElementToAnsiColor(
        `${this.prefix} | <ye>WARN</ye> | ${message}`
      )
    );
  }

  error(message) {
    this.prefix = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]`;
    console.log(
      this.#convertHtmlElementToAnsiColor(
        `${this.prefix} | <re>ERROR</re> | ${message}`
      )
    );
  }

  debug(message) {
    this.prefix = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]`;
    console.log(
      this.#convertHtmlElementToAnsiColor(
        `${this.prefix} | <la>DEBUG</la> | ${message}`
      )
    );
  }

  success(message) {
    this.prefix = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]`;
    console.log(
      this.#convertHtmlElementToAnsiColor(
        `${this.prefix} | <gr>SUCCESS</gr> | ${message}`
      )
    );
  }

  #stripAnsiCodes(text) {
    const ansiRegex = /\x1b\[[0-9;]*m/g;
    return text.replace(ansiRegex, "");
  }

  #addRoundedBorder(logText) {
    const lines = logText.split("\n");

    const maxLength = lines.reduce(
      (max, line) => Math.max(max, this.#stripAnsiCodes(line).length),
      0
    );

    const topBorder = `${this.BLUE}╭${"─".repeat(maxLength + 2)}╮${this.RESET}`;
    const bottomBorder = `${this.BLUE}╰${"─".repeat(maxLength + 2)}╯${
      this.RESET
    }`;
    console.log(topBorder);
    lines.forEach((line) => {
      const strippedLineLength = this.#stripAnsiCodes(line).length;
      console.log(
        `${this.BLUE}│${this.RESET} ${line}${" ".repeat(
          maxLength - strippedLineLength
        )} ${this.BLUE}│${this.RESET}`
      );
    });
    console.log(bottomBorder);
  }

  paragraph(message) {
    this.prefix = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]`;
    this.#addRoundedBorder(
      this.#convertHtmlElementToAnsiColor(
        `<u>${this.prefix}</u> <br>
${message}`
      )
    );
  }
}

const logger = new Logger();

module.exports = logger;
