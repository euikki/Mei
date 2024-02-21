const { Client, Collection } = require('discord.js');
const Table = require('cli-table3');
const fs = require('fs');
const colorize = require('strcolorize')
const { FormatEmoji } = require('../functions/FormatEmoji/index');

module["exports"] = class Mei extends Client {
  constructor(options) {
    super({
      intents: options.intents,
    });

    this.prefix = options.prefix;
    this.developers = options.developers
    this.token = options.token;
    this.FormatEmoji = FormatEmoji

    this.commands = new Collection();
    this.components = new Collection();
    this.cooldowns = new Collection();
  }

  async setup() {
    try {
      this.#HandlerCommands();
      this.#HandlerEvents();
      this.#HandlerComponents();
          
      await super.login(this.token);
      console.log(
        colorize(`[${this.user.username}](magenta bold) está conectada!`)
      );
    } catch (error) {
      console.error(`Ocorreu um erro durante a conexão com o cliente:`, error);
    }
  }

  #HandlerCommands() {
    const table = new Table({ 
      head: [
        colorize('[comandos](cyan bold)'),
        colorize('[status](blue)')
      ]
    });

    fs.readdirSync("./src/commands").forEach((directory) => {
      const commandFiles = fs
        .readdirSync(`./src/commands/${directory}/`)
        .filter((cmdFile) => cmdFile.endsWith(".js"));

      commandFiles.forEach((file) => {
        const command = require(`../commands/${directory}/${file}`);
        if (!command) return;

        this.commands.set(command.name, command);

        table.push([
          command.name,
          colorize("[sucesso](green)")
        ]);
      });
    });

    console.log(table.toString());
  }

  #HandlerEvents() {
    const table = new Table({ 
      head: [
        colorize('[evetos](cyan bold)', false),
        colorize('[status](blue)', false)
      ]
    });

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
      table.push([
        events.type,
        colorize("[sucesso](green)")
      ]);
    });

    console.log(table.toString());
  }

  #HandlerComponents() {
    const table = new Table({ 
      head: [
      colorize('[componentes](cyan bold)', false),
      colorize('[status](blue)', false)
    ]
  });

    fs.readdirSync('./src/components').forEach(directory => {
        const componentFile = fs.readdirSync(`./src/components/${directory}/`).filter(cmpFile => cmpFile.endsWith(".js"));

        componentFile.forEach(file => {
            const components = require(`../components/${directory}/${file}`);
            if (!components) return;

            if (!components || !Array.isArray(components)) return;

            components.forEach(component => {
            this.components.set(component.id, component);
            table.push([
              component.id,
              colorize("[sucesso](green)")
            ])
            });
        });
    });
    console.log(table.toString())
  }
};