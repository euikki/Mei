const Discord = require("discord.js");
const User = require('../../mongoDB/schemas/userschema');
const insigniaa = require('../../constants/insignias.json');

module.exports = {
  name: "registrar",
  description: "🌹 Atravesse o portal para utilizar meus comandos.",
  category: "special",

  run: async (client, message, args) => {
    let userData = await User.findOne({ _id: message.author.id });

    if (userData) {
      return message.reply(client.FormatEmoji('> - {e:erro} Você já está registrado no meu **banco de dados**!'));
    }

   
await message.reply({ content: client.FormatEmoji(`> - {e:lista} \`${message.author.username}\` você completou seu registro e com isso ganhou a **(${insigniaa.insig.registro}) Insígnia de aventureiro**!`)}); 

xana = new User({ _id: message.author.id, insignia: insigniaa.insig.registro});
await xana.save();
}}
