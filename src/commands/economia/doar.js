const Discord = require('discord.js');
const User = require('../../mongoDB/schemas/userschema');

module.exports = {
  name: 'doar',
  aliases: ["dr","pagar","pay"],
  description: '🌌 Doe fragmentos para um viajante',
  
  run: async (client, message, args) => {
  
    const viajante = message.mentions.members.first();
    const fragmentos = parseInt(args[1]);

    if (!viajante || !fragmentos) return message.reply(client.FormatEmoji(`> - {e:erro} Utilize o meu comando da **forma correta:** \`${client.prefix}doar <user> <quantia>\``));
    if (!Number.isInteger(fragmentos) || fragmentos <= 0) return message.reply(client.FormatEmoji(`> - {e:erro} **Adicione um valor válido!**`));
    
    const user = await User.findOne({ _id: message.author.id });
    
    if (!user || user.bolso < fragmentos) return message.reply(client.FormatEmoji('> - {e:erro} Você não tem tudo isso em seu bolso!'));

    const button = new Discord.ActionRowBuilder().addComponents(
      new Discord.ButtonBuilder().setCustomId("aceitar").setStyle(Discord.ButtonStyle.Success).setEmoji(client.FormatEmoji("{correto}"))
    );

    const menage = await message.reply({ content: client.FormatEmoji(`> - ${viajante.user}, **${message.author.username}** está fazendo a boa e lhe doando **({dailyf}) ${fragmentos.toLocaleString()} fragmentos**, aperte no botão abaixo para concluir a doação.`), components: [button] });
    const coletor = menage.createMessageComponentCollector({ filter: i => i.customId === 'aceitar', time: 15000 });

    coletor.on('collect', async i => {
      if (i.customId === 'aceitar') {
        if (i.user.id !== viajante.user.id) {
          return i.reply({ content: `> - Desculpe, apenas ${viajante.user} pode apertar no botão.`, ephemeral: true });
        }

        user.bolso -= fragmentos;
        await user.save();

        const mencionado = await User.findOne({ _id: viajante.user.id });
        if (mencionado) {
          mencionado.bolso += fragmentos;
          await mencionado.save();
          i.update({ content: client.FormatEmoji(`> - {e:frag} Doação concluída, a quantia de **({dailyf}) ${fragmentos.toLocaleString()} fragmentos**  foi adicionado ao bolso de ${viajante.user}.`), components: [] });
        }
      }
    });

    coletor.on('end', collected => {
      if (collected.size === 0) {
        menage.delete();
      }
    });
  }
};
