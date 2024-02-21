const Discord = require("discord.js");
const server = require('../../mongoDB/schemas/guildschema')

module.exports = {
    name: "set-entrada",
    aliases: ["ste"],
    description: "⚙ Configure o canal de entradas.",
    category: "settings",
    run: async(client, message, args) => {

        const action = args[0];
        if(!action || (action !== 'ativar' && action !== 'desativar')) return message.reply(client.FormatEmoji(`{e:erro} Utilize o comando da seguinte forma: \`${client.prefix}set-entrada ativar <#canal> || desativar\` `));

        if(action === 'desativar') {
            await updateChannel(message.guild.id, false, null);
            return message.channel.send(client.FormatEmoji(`{e:info} O sistema de **boas vindas** foi desativado com sucesso.`));
        }

        const channel = message.mentions.channels.first();
        if(!channel) return message.reply(client.FormatEmoji("> {e:erro} Você deve fornecer o canal onde a mensagem será enviada."));

        await updateChannel(message.guild.id, true, channel.id);
        message.channel.send(client.FormatEmoji(`> {e:correto} O canal ${channel} foi definido para receber os logs de entradas!\n - Você pode** personalizar a embed** de boas-vindas utilizando o comando: **\`${client.prefix}stm\`**`));
    }
}

async function updateChannel(_id, entrada, canal) {
    await server.findOneAndUpdate({ _id }, { $set: { entrada, canal } }, { upsert: true, new: true });
}
