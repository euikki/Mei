const Discord = require("discord.js");
const User = require('../../mongoDB/schemas/userschema');
const moment = require('moment-timezone');

module.exports = {
  name: "coletar",
  aliases: ["daily"],
  description: "🌌 Colete seus fragmentos e cogumelos diários.",
  category: "economy",

  run: async (client, message, args) => {
    
    const user = await User.findOne({ _id: message.author.id });
    const { vip, daily_tempo } = user;
    const BloodMoon = [0, 5].includes(moment().tz('America/Sao_Paulo').day());
   
    
    if (daily_tempo && (Date.now() - daily_tempo < (vip ? 43200000 : 86400000))) {  
      const time = Math.floor((daily_tempo + (vip ? 43200000 : 86400000) - Date.now()) / 1000);
      const horas = Math.floor(time / 3600);
      const minutos = Math.floor((time % 3600) / 60);
      
      return message.reply({ content: client.FormatEmoji(`{e:lua} \`${message.author.username}\` você só poderá sair para **coletar** novamente em **${horas} horas e ${minutos} minutos**.`) });
    }
    
    
    
    const [item, emoji] = BloodMoon ? ["Cogumelos", "{dailyc}"] : ["Fragmentos", "{dailyf}"];
    const collect = Math.ceil(Math.random() * (BloodMoon ? 1200 : (vip ? 4300 : 2300)));
    user[BloodMoon ? 'cave' : 'bolso'] += collect;

    let AlternativeMessage = `> - {e:star} ${message.author} ${BloodMoon ? "Hoje é dia de **lua de sangue**, em sua coleta você obteve" : "Você fez a sua coleta e conseguiu"} **(${emoji}) ${collect.toLocaleString()} ${item}!!**`;

    if (vip) {
      const Mushroom = Math.ceil(Math.random() * 1200);
      const fragment = Math.ceil(Math.random() * 4300);
      user.cave += Mushroom;
      user.bolso += fragment;
      AlternativeMessage += `> - {e:portal} Em sua coleta você obteve **({dailyf}) ${fragment.toLocaleString()} Fragmentos** e um bônus de **({dailyc}) ${Mushroom.toLocaleString()} Cogumelos**!`;
    }

    message.reply({ content: client.FormatEmoji(AlternativeMessage) });

    user.daily_tempo = Date.now();
    await user.save();
  }
};
