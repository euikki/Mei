const Discord = require("discord.js");

const labels = {};

const SelectOptions = (label, description, value, emoji) => {
    labels[value] = label;
    return {
        label: label,
        description: description,
        value: value,
        emoji: emoji,
    };
}

module.exports = {
    name: "ajuda",
    aliases: ["help"],
    description: "bah",
    category: "informations",
    run: async(client, message, args) => {

        let embed = new Discord.EmbedBuilder()
        .setDescription(client.FormatEmoji(`### Painel de Ajuda
        > - {e:info} **${message.author}**, Notei que você tem dúvidas sobre meus comandos. Observe a barra abaixo e use-a para **navegar**. \n_ _ \n > cada categoria possui seus comandos correspondentes. Você pode visualizá-los selecionando uma opção na barra.`))
        .setColor('#97989a')
        .setAuthor({ name: `${message.author.username}`, iconURL: message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 })})
        .setThumbnail('https://i.imgur.com/kavadOg.png')
        .addFields([
            {
                name: client.FormatEmoji('{link} Está precisando de ajuda?'),
                value: '[Entre no Servidor de Suporte](https://discord.gg/wQGtXQfUTe)',
                inline: true
            }, {
                name: client.FormatEmoji('{link} Me adicione!!'),
                value: `[Adicionar ${client.user.username}](https://discord.com/api/oauth2/authorize?client_id=1189612874449031330&permissions=8&scope=bot)`,
                inline: true
            }, {
                name: client.FormatEmoji('{interrogacao} Como usar'),
                value: '`<>` Escopo Obrigatório \n `{}` Escopo Opcional',
                inline: false
            }
        ])

        const Menu = SelectOptions('Início', 'Selecione está opção para voltar para o painel inicial.', 'painel', '🏠');
        const Infos = SelectOptions('Informações', 'Selecione essa categoria para ver os comandos de informações', 'informations', '❗');
        const Developers = SelectOptions('Desenvolvedores', 'Selecione essa categoria para ver os comandos de desenvolvedores', 'developers', '📌');
        const Members = SelectOptions('Viajantes', 'Selecione essa categoria para ver os comandos de viajantes', 'members', '🔮');
        const Economy = SelectOptions('Economia', 'Selecione essa categoria para ver os comandos de economia', 'economy', '💰');
        const Special = SelectOptions('Especiais', 'Selecione essa categoria para ver os comandos especiais', 'special', '🌹');

        const Id = Date.now();
        const dashboard = new Discord.StringSelectMenuBuilder()
            .setPlaceholder('Selecione uma categoria')
            .setCustomId(`menu_${message.author.id}_${Id}`)
            .addOptions([Menu, Infos, Developers, Members, Economy, Special]);
        

        const row = new Discord.ActionRowBuilder()
        .addComponents(dashboard);

        message.channel.send({
            embeds: [embed],
            components: [row]
        });

        client.on('interactionCreate', async interaction => {
            if (!interaction.isStringSelectMenu()) return;
            if (interaction.customId === `menu_${message.author.id}_${Id}`) {
                if (interaction.user.id !== message.author.id) {
                    return await interaction.deferUpdate();
                }
                const category = interaction.values[0];
                
                if (category === 'painel') {
                    embed .setDescription(client.FormatEmoji(`### Painel de Ajuda
                    > - {e:info} **${message.author}**, Notei que você tem dúvidas sobre meus comandos. Observe a barra abaixo e use-a para **navegar**. \n_ _ \n > cada categoria possui seus comandos correspondentes. Você pode visualizá-los selecionando uma opção na barra.`))
                    embed.setThumbnail('https://i.imgur.com/kavadOg.png')                
                } else {
                    const commands = client.commands.filter(cmd => cmd.category === category);
                    let description = commands.map(cmd => cmd.name).join(', ');

                    embed.setDescription(`### ${labels[category]} — Comandos abaixo:\`\`\`${description}\`\`\``)
                    embed.setThumbnail();
                }
                
                await interaction.update({ embeds: [embed] });
            }
        });
            
        
    }
}
