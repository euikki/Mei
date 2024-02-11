const Discord = require("discord.js");
const server = require("../../mongoDB/schemas/guildschema");

module.exports = [
    {
      id: 'title',
      authorOnly: true,
      run: async (client, interaction) => {

      const modal = new Discord.ModalBuilder()
        .setCustomId('title')
        .setTitle('📌・Qual vai ser o título da embed?');
    
      let titleContent = new Discord.ActionRowBuilder().addComponents(
      new Discord.TextInputBuilder()
        .setCustomId('content')
        .setLabel('Essa opção é opcional.')
        .setStyle(Discord.TextInputStyle.Short)
     )

     modal.addComponents(titleContent)
     await interaction.showModal(modal)
      }
    }, /////////// Description
    {
      id: 'description',
      authorOnly: true,
      run: async (client, interaction) => {

      const modal = new Discord.ModalBuilder()
        .setCustomId('description')
        .setTitle('Modal');
    
      let descriptionContent = new Discord.ActionRowBuilder().addComponents(
      new Discord.TextInputBuilder()
        .setCustomId('content')
        .setLabel('﹝📝﹞・Qual vai ser a descrição da embed?')
        .setRequired(true)
        .setStyle(Discord.TextInputStyle.Paragraph)
     )

     modal.addComponents(descriptionContent)
     await interaction.showModal(modal)
      }
    }, /////////// Thumbanail
    {
        id: 'thumbnail',
        authorOnly: true,
        run: async (client, interaction) => {

      const modal = new Discord.ModalBuilder()
          .setCustomId('description')
          .setTitle('Modal');
      
      let thumbnailContent = new Discord.ActionRowBuilder().addComponents(
        new Discord.TextInputBuilder()
          .setCustomId('content')
          .setLabel('﹝🔗﹞・Forneça o link da thumbnail abaixo:')
          .setStyle(Discord.TextInputStyle.Paragraph)
       )
  
       modal.addComponents(thumbnailContent)
       await interaction.showModal(modal)
        }
      }, /////////// Image
      {
        id: 'image',
        authorOnly: true,
        run: async (client, interaction) => {
      
      const modal = new Discord.ModalBuilder()
          .setCustomId("image")
          .setTitle("Modal");

      let imageContent = new Discord.ActionRowBuilder().addComponents(
         new Discord.TextInputBuilder()
         .setCustomId('content')
         .setLabel("﹝🔗﹞・Forneça o link da imagem abaixo:")
         .setStyle(Discord.TextInputStyle.Paragraph)
      )
      
      modal.addComponents(imageContent);
      await interaction.showModal(modal)
        
        }
      }, /////////// Color
      {
        id: 'color',
        authorOnly: true,
        run: async (client, interaction) => {

      const modal = new Discord.ModalBuilder()
        .setCustomId('title')
        .setTitle('Modal');
      
      let colorContent = new Discord.ActionRowBuilder().addComponents(
        new Discord.TextInputBuilder()
        .setCustomId('content')
        .setLabel('﹝🎨﹞・Informe o hexa para adicionarmos a cor na embed:')
        .setStyle(Discord.TextInputStyle.Short)
       )
  
       modal.addComponents(colorContent)
       await interaction.showModal(modal)
        
      
      }
      }
  ];
  
