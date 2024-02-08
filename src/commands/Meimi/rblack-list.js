const Discord = require('discord.js');
const userDB = require('../../mongoDB/schemas/userschema');

module.exports = {
    name: 'rblack-list',
    aliases: ["rbl"],
    DevOnly: true,
    category: "developers",
    description: '☕ Remove um usuário da black list.',
    run: async (client, message, args) => {
        const mentionedUser = message.mentions.users.first();
        if (!mentionedUser) {
            return message.channel.send('Usuário inválido ou não encontrado.');
        }
      
        try {
            const mentionedDB = await userDB.findById(mentionedUser.id);
            if (mentionedDB) {
                mentionedDB.blacklist.impostor = '';
                mentionedDB.blacklist.reason = '';
        
                await mentionedDB.save();
                await message.react('✔');
            }
        } catch (err) {
            console.error('Erro ao remover da blacklist:', err);
            return message.channel.send('Ocorreu um erro ao remover da blacklist.');
        }
    },
};
