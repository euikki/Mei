const Discord = require('discord.js')
const { inspect } = require('util');
const { exec } = require('child_process');

module.exports = {
    name: 'eval',
    aliases: ["e", "ev"],
    DevOnly: true,
    description: "Executar códigos",
    category: "developers",

    run: async (client, message, args) => {
        try {
            const code = args.join(" ");

            const evaled = eval(code);

            if (evaled instanceof Promise) await evaled;

            const formattedResult = inspect(evaled, { depth: 1 }).substring(0, 1990);

            message.channel.send(`\`\`\`js\n${formattedResult}\`\`\``);
        } catch (error) {
            message.channel.send(`\`\`\`js\n${error}\`\`\``);
        }
    }
};