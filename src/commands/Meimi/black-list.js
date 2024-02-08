const Discord = require('discord.js');
const userDB = require('../../mongoDB/schemas/userschema');

module.exports = {
    name: 'black-list',
    aliases: ["bl"],
    DevOnly: true,
    description: '☕ Adicionar um usuário a black list',
    category: "developers",
    run: async (client, message, args) => {
        if (!args.length) {
            return message.reply(client.FormatEmoji('> - {e:erro}  Utilize o meu comando da **forma correta**: `<user> <motivo>`'));
        }

        let mentionedUser = message.mentions.users.first();
        if (!mentionedUser) {
            mentionedUser = client.users.cache.get(args[0]);
            if (!mentionedUser) {
                return message.reply(client.FormatEmoji('> - {e:erro}  **Não foi possível encontrar o usuário especificado.**'));
            }
        }
        
        const reason = args.slice(1).join(' ');
        if (!reason) {
            return message.reply(client.FormatEmoji('> - {e:erro}  Utilize o meu comando da **forma correta**: `<user> <motivo>`'));
        }
        
        try {
            const mentionedDB = await userDB.findById(mentionedUser.id);
            if (mentionedDB) {
                mentionedDB.blacklist.impostor = 'banido'; 
                mentionedDB.blacklist.reason = reason;
        
                await mentionedDB.save();
                await message.react(client.FormatEmoji('{correto}'));
            }
        } catch (err) {
            console.error('Deu erro aqui menor', err);
            return message.channel.send('foda-se');
        }
        
    },
};
