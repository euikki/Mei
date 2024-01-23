const Discord = require("discord.js");
const User = require('../../mongoDB/schemas/userschema');

module.exports = {
    name: "bolso",
    aliases: ["atm"],
    description: "🌌 Veja o seu bolso ou o de um viajante.",
  
    run: async (client, message, args) => {
      let user;
      let author = false;
  
      if (message.mentions.users.first()) {
        user = await User.findOne({ _id: message.mentions.users.first().id });
        username = message.mentions.users.first().username;
      } else {
        user = await User.findOne({ _id: message.author.id });
        username = message.author.username;
        author = true;
      }

      const fragmentos = user.bolso;
      const cogumelos = user.cave;
  
      const Mbolso = author ? `> - Você possui **({dailyf}) ${fragmentos.toLocaleString()} Fragmentos** e **({dailyc}) ${cogumelos.toLocaleString()} Cogumelos** em seu bolso.` : `> - ${message.author}, O viajante **\`${username}\`** possui uma quantia de **({dailyf}) ${fragmentos.toLocaleString()} Fragmentos** e **({dailyc}) ${cogumelos.toLocaleString()} Cogumelos** em seu bolso.`;
      return message.reply({ content: client.FormatEmoji(Mbolso)});
    }
  };