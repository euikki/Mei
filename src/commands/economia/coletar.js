const Discord = require("discord.js");
const User = require('../../mongoDB/schemas/userschema');
const moment = require('moment-timezone');

module.exports = {
  name: "coletar",
  aliases: ["daily"],
  description: "🌌 Colete seus fragmentos e cogumelos diários.",

  run: async (client, message, args) => {
    
    const user = await User.findOne({ _id: message.author.id });
    const { vip, daily_tempo } = user;
    const BloodMoon = [0, 5].includes(moment().tz('America/Sao_Paulo').day());

    if (daily_tempo && (Date.now() - daily_tempo < (vip ? 43200000 : 86400000))) {
      return message.reply({ content: client.FormatEmoji(`{e:lua} \`${message.author.username}\` você só poderá sair para **coletar** novamente **<t:${Math.floor((Date.now() + (vip ? 43200000 : 86400000) - daily_tempo) / 1000)}:R>**.`) });
    }

    const [item, emoji] = BloodMoon ? ["Cogumelos", "{dailyc}"] : ["Fragmentos", "{dailyf}"];
    const coleta = Math.ceil(Math.random() * (BloodMoon ? 1200 : (vip ? 4300 : 2300)));
    user[BloodMoon ? 'cave' : 'bolso'] += coleta;

    let replyMessage = `> - {e:star} ${message.author} ${BloodMoon ? "Hoje é dia de **lua de sangue**, em sua coleta você obteve" : "Você fez a sua coleta e conseguiu"} **(${emoji}) ${coleta.toLocaleString()} ${item}!!**`;

    if (vip) {
      const cogumelo = Math.ceil(Math.random() * 1200);
      const fragmento = Math.ceil(Math.random() * 4300);
      user.cave += cogumelo;
      user.bolso += fragmento;
      replyMessage += `> - {e:portal} Em sua coleta você obteve **({dailyf}) ${fragmento.toLocaleString()} Fragmentos** e um bônus de **({dailyc}) ${cogumelo.toLocaleString()} Cogumelos**!`;
    }

    message.reply({ content: client.FormatEmoji(replyMessage) });

    user.daily_tempo = Date.now();
    await user.save();
  }
};
