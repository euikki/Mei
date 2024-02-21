const Discord = require("discord.js");
const User = require('../../mongoDB/schemas/userschema');
const Mbutton = require("../../functions/buttonBuilder")

module.exports = {
  name: "registrar",
  description: "🌹 Atravesse o portal para utilizar meus comandos.",
  category: "special",

run: async (client, message, args) => {
  let userData = await User.findOne({ _id: message.author.id });

  if (userData) {
    return message.reply(client.FormatEmoji('> - {e:erro} Você já está registrado no meu **banco de dados**!'));
  }


const button = Mbutton([
  {label: "Ver presente", emoji: client.FormatEmoji("{e:gift}"), customId: `[gift, ${message.author.id}]`, style: "Secondary"}
])

await message.reply({ content: client.FormatEmoji(`> {e:lista} \`${message.author.username}\` Parabéns por se registrar! com isso você acaba de ganhar **2 presentes**.\n > - Aperte no botão abaixo para visualizar seus presentes.`), components: [button] });

user = new User({ _id: message.author.id});
await user.save();
}}
