const Discord = require("discord.js");
const server = require("../../mongoDB/schemas/guildschema");
const MButton = require('../../functions/buttonBuilder');

module.exports = {
    name: "set-mensagem",
    aliases: ["stm"],
    description: "⚙ Configure a mensagem de boas vindas.",
    category: "settings",
    run: async(client, message, args) => {
        const guildConfig = await server.findOne({ _id: message.guild.id });
        if (!guildConfig || !guildConfig.entrada) {
            return message.reply("Você precisa ativar o sistema de boas-vindas antes de poder personalizar a mensagem!");
        }

        const buttons = MButton([
            { label: 'Título', customId: `[title, ${message.author.id}]`, style: 'Secondary' },
            { label: 'Descrição', customId: `[description, ${message.author.id}]`, style: 'Secondary' },
            { label: 'Thumbnail', customId: `[thumbnail, ${message.author.id}]`, style: 'Secondary' },
            { label: 'Imagem', customId: `[image, ${message.author.id}]`, style: 'Secondary' },
            { label: 'Cor', customId: `[color, ${message.author.id}]`, style: 'Secondary' }
          ]);          


        const embed = new Discord.EmbedBuilder()
            .setTitle("Personalise sua embed de boas vindas:")
            .setColor("#97989a")
            .setDescription(`> - Selecione um botão correspondente ao campo que você deseja alterar:\n\n## Lembrando, você pode utilizar os seguinte parâmetros:
            > **{userMention}** \`\`\`Forneça esse valor caso queira mencionar o membro que acabou de entrar.\`\`\`
            > **{userName}** \`\`\`Forneça esse valor caso queira que o Nickname do membro seja exibido.\`\`\`
            > **{userId}** \`\`\`Forneça esse valor caso queira que o Id do membro seja exibido.\`\`\`
            > **{userCount}** \`\`\`Forneça esse valor caso queira que a quantidade de membros seja exibida.\`\`\`
            `);

        message.channel.send({ embeds: [embed], components: [buttons] });
    }
}
