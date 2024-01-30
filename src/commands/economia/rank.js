const Discord = require("discord.js");
const User = require('../../mongoDB/schemas/userschema');

module.exports = {
    name: "rank",
    aliases: ["rf", "top"],
    description: "🌌 Ver os viajantes com mais fragments",
    category: "economy",

    run: async (client, message, args) => {
        const fragments = await User.find({ bolso: { $gt: 0 } }).sort({ bolso: -1 }).limit(10);

        if (fragments.length === 0) {
            return message.channel.send(`\`🥀\` - Parece que não tem ninguém no ranking\n > - mude isso usando **${client.prefix}coletar**`);
        }

        const finish = [];
        for (let i = 0; i < fragments.length; i++) {
            const viajante = fragments[i];
            const user = await client.users.fetch(viajante._id);
            finish.push(`> \`( ${i + 1}º )\` - **${user.username}** - \`${viajante.bolso.toLocaleString()}\``);
        }

        const position = finish.findIndex(entry => entry.includes(message.author.username)) + 1;

        const embed = new Discord.EmbedBuilder()
            .setDescription(client.FormatEmoji(`# {e:frag} Ranking de Fragmentos:\n` + finish.join("\n")))
            .setColor('#97989a')
           .setThumbnail("https://i.imgur.com/gRq95jp.png")
            .setFooter({text: `${message.author.username} sua posição é #${position}`, iconURL: message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 })})
            .setTimestamp()

        message.channel.send({ embeds: [embed] });
    }
};
