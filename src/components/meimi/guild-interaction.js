const ServerModel = require('../../mongoDB/schemas/guildschema');

module["exports"] = [{
    id: 'guild-info',
    authorOnly: true,
    run: async (client, interaction) => {
     
      const serverList = await ServerModel.find({});
  
      const listReply = serverList.map((servidor, index) => {
        const guild = client.guilds.cache.get(servidor._id);
        const serverName = guild ? guild.name : 'Desconhecido';
        return `> - **Dimensão-${index + 1}:** \`${serverName}\`**\`(${servidor._id})\`**\n**Dono:** <@!${guild.ownerId}>`;
      }).join('\n\n');
      
      if(listReply) {
        interaction.reply({ content: listReply, ephemeral: true });
      } else {
        console.log('Nenhuma informação do servidor para enviar.');
      }
    
}}]
