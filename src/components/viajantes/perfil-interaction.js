const Discord = require('discord.js')

module["exports"] = [{
    id: 'about',
    authorOnly: true,
   run: async(client, interaction) => {
        const modal = new Discord.ModalBuilder()
        .setCustomId('about-me')
        .setTitle('Informe a descrição do seu Perfil.');

        let about = new Discord.ActionRowBuilder().addComponents(
            new Discord.TextInputBuilder()
              .setCustomId('me')
              .setLabel('Descrição do sobre-mim')
              .setStyle(Discord.TextInputStyle.Short)
              .setMaxLength(100)
        )
        
     modal.addComponents(about)
     await interaction.showModal(modal);
   }
}]