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
    const { daily_time } = user;
    const BloodMoon = [0, 5].includes(moment().tz('America/Sao_Paulo').day());
   
    
    if (daily_time && (Date.now() - daily_time < 86400000)) {  
      const time = Math.floor((daily_time + 86400000 - Date.now()) / 1000);
      const horas = Math.floor(time / 3600);
      const minutos = Math.floor((time % 3600) / 60);
      
      return message.reply({ content: client.FormatEmoji(`> {e:lua} \`${message.author.username}\`, sua **próxima coleta** só poderá ser feita novamente em: **${horas} horas e ${minutos} minutos**.`) });
    }
    
    const [item, emoji] = BloodMoon ? ["Cogumelos", "{dailyc}"] : ["Fragmentos", "{dailyf}"];
    const collect = Math.ceil(Math.random() * (BloodMoon ? 1200 : 2300));
    user[BloodMoon ? 'mushroom' : 'fragments'] += collect;

    let AlternativeMessage = `> {e:star} ${message.author} ${BloodMoon ? "Hoje é **lua de sangue**, seus **fragmentos** se transformaram em" : "Você fez a sua coleta e conseguiu"} **(${emoji}) ${collect.toLocaleString()} ${item}!!**`;

    message.reply({ content: client.FormatEmoji(AlternativeMessage) });

    user.daily_time = Date.now();
    await user.save();
  }
};
