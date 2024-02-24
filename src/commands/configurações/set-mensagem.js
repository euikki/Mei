const Discord = require("discord.js");
const server = require("../../mongoDB/schemas/guildschema");
const MeiButton = require('../../functions/buttonBuilder');

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

        const buttons = MeiButton([
            { label: 'Editar conteúdo Principal', customId: `[open-primary, ${message.author.id}]`, style: 'Secondary' },
            { label: 'Editar conteúdo Adcional', customId: `[open-secondary, ${message.author.id}]`, style: 'Secondary' },
            { label: 'Ver a embed', customId: `[preview, ${message.author.id}]`, style: 'Success' },
          ]);          


        const embed = new Discord.EmbedBuilder()
            .setTitle("Personalise sua embed de boas vindas:")
            .setColor("#97989a")
            .setDescription(`> - Aperte nos botões abaixo para abrir o painel de edição:\n - o **\`botão principal\`** contem a estilização do Título, Descrição e a Cor da embed, já o **\`botão adicional\`** é a estilização da Imagem e Thumbnail\n### 📌 • Lembrando, você pode utilizar as seguintes alias:`)
            .setFields({
                name:"> {userMention}", value:"```Forneça esse valor caso queira mencionar o membro que acabou de entrar.```", inline: true
            }, {
                name:"> {userName}", value:"```Forneça esse valor caso queira que o Nickname do membro seja exibido.```", inline: true
            }, {
                name:"> {userId}", value:"```Forneça esse valor caso queira que o Id do membro seja exibido.```", inline: true
            }, {
                name:"> {userCount}", value:"```Forneça esse valor caso queira que a quantidade de membros seja exibida.```", inline: true
            })

        message.channel.send({ embeds: [embed], components: [buttons] });
    }
}
