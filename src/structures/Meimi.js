const { Client, Collection } = require("discord.js");
const Table = require("cli-table3");
const fs = require("fs");
const colors = require("colors");
const { FormatEmoji } = require("../functions/index");

module["exports"] = class Daijin extends Client {
  constructor(options) {
    super({
      intents: options.intents,
    });

    this.prefix = options.prefix;
    this.divos = options.divos
    this.token = options.token;
    this.FormatEmoji = FormatEmoji

    this.commands = new Collection();
    
    this.cooldowns = new Collection();
  }

  async setup() {
    try {
      this.#HandlerCommands();
      this.#HandlerEvents();

      await super.login(this.token);
      console.log(
        `${this.user.username.magenta.bold} foi conectada com sucesso.`
      );
    } catch (error) {
      console.error(`Ocorreu um erro durante a conexão com o cliente:`, error);
    }
  }

  #HandlerCommands() {
    const table = new Table({ head: [colors.cyan("comandos"), colors.blue("status")] });

    fs.readdirSync("./src/commands").forEach((directory) => {
      const commandFiles = fs
        .readdirSync(`./src/commands/${directory}/`)
        .filter((cmdFile) => cmdFile.endsWith(".js"));

      commandFiles.forEach((file) => {
        const command = require(`../commands/${directory}/${file}`);
        if (!command) return;

        this.commands.set(command.name, command);

        table.push([command.name, "sucesso"]);
      });
    });

    console.log(table.toString());
  }

  #HandlerEvents() {
    const table = new Table({ head: [colors.cyan("eventos"), colors.blue("status")] });

    fs.readdirSync("./src/events").forEach((files) => {
      const events = require(`../events/${files}`);
      if (!events.type) return;

      if (events.once) {
        super.once(events.type, (...args) => {
          events.run(this, ...args);
        });
      } else {
        super.on(events.type, (...args) => {
          events.run(this, ...args);
        });
      }
      table.push([events.type.white, "sucesso".white]);
    });

    console.log(table.toString());
  }
};
