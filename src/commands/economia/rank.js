const Discord = require("discord.js");
const User = require('../../mongoDB/schemas/userschema');

module.exports = {
    name: "rank",
    aliases: ["rf", "top"],
    description: "🌌 Ver os viajantes com mais fragmentos",

    run: async (client, message, args) => {
        const fragmentos = await User.find({ bolso: { $gt: 0 } }).sort({ bolso: -1 }).limit(10);

        if (fragmentos.length === 0) {
            return message.channel.send(`\`🥀\` - Parece que não tem ninguém no ranking\n > - mude isso usando **${client.prefix}coletar**`);
        }

        const final = [];
        for (let i = 0; i < fragmentos.length; i++) {
            const viajante = fragmentos[i];
            const user = await client.users.fetch(viajante._id);
            final.push(`> \`( ${i + 1}º )\` - **${user.username}** - \`${viajante.bolso.toLocaleString()}\``);
        }

        const JojoPose = final.findIndex(entry => entry.includes(message.author.username)) + 1;

        const embed = new Discord.EmbedBuilder()
            //.setTitle(client.FormatEmoji(`{e:frag} Ranking de Fragmentos:`))
            .setDescription(client.FormatEmoji(`# {e:frag} Ranking de Fragmentos:\n` + final.join("\n")))
            .setColor('#97989a')
           .setThumbnail("https://i.imgur.com/gRq95jp.png")
            .setFooter({text: `${message.author.username} sua posição é #${JojoPose}`, iconURL: message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 })})
            .setTimestamp()

        message.channel.send({ embeds: [embed] });
    }
};
