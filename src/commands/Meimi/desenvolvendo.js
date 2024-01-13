const Discord = require('discord.js');
const status = require('../../functions/Manutention');

module.exports = {
    name: 'manutencao',
    aliases: ["set-mnt","mnt", "manutenção"],
    ViajantePerm: ["Administrator"],
    MeimiPerm: ['Administrator'],
    restrito: true,
    description: '☕ Setar menutenção.',
  run: async (client, message, args) => {
     if (!client.divos.includes(message.author.id)) {
        await message.react('❌');
    }


    status.toggle();
    message.channel.send(`> - **(💭) ›** ${message.author}  A manutenção foi **${status.get() ? 'ativada' : 'desativada'}**!`);
  }
}
