const Discord = require('discord.js')
const MESSAGE = require('../constants/message.json');
const { permissions } = require('../constants/permissions.json');

const { FormatEmoji } = require('../functions/FormatEmoji');
const { userDB } = require('../mongoDB/index');
module["exports"] = {
    type: 'messageCreate',
    run: async (client, message) => {
        if(message.author.bot) return;
        
    
        if(message.content.replace('!', '').startsWith(`<@${client.user?.id}>`)){
    
    const row = new Discord.ActionRowBuilder().addComponents(
    
        new Discord.ButtonBuilder()
        .setLabel("Servidor de suporte")
        .setStyle(Discord.ButtonStyle.Link)
        .setURL(`https://discord.gg/vAyY7E3tyv`),
        new Discord.ButtonBuilder()
        .setLabel("Minha dimensão")
        .setStyle(Discord.ButtonStyle.Link)
        .setURL(`https://discord.gg/vAyY7E3tyv`)
)


        return message.reply({content: FormatEmoji(`> - **(\`🥀\`) ›** Olá **\`${message.author.username}\`**, eu me chamo **${client.user.username}** e eu serei sua  guardiã entre as dimensões!
        > -  Você pode utilizar **\`${client.prefix}ajuda\`** para ver todos os meus comandos.`), components: [row]});}

       if(!message.content.startsWith(client.prefix) || !message.guild) return;

       
       
       const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
       const cmdName = args.shift().toLowerCase();
       const command = client.commands.get(cmdName) || client.commands.find(als => als.aliases?.includes(cmdName));
       
       if (!command){ message.channel.send(client.FormatEmoji(`{e:erro} ${message.author}, ** Esse comando não foi encontrado na minha lista de comandos, verifique se a ortografia está correta.**`)); return;};
       if (command.DevOnly && !client.developers.includes(message.author.id)) {
          message.reply(client.FormatEmoji(`{e:erro} Apenas meu **desenvolvedor** e **pessoas autorizadas** podem utilizar esse comando.`));
          return; }


       //   if (!client.developers.includes(message.author.id)) return message.channel.send('**(`☕`) -** Estou em **manutenção**, por favor volte mais tarde!')
        
        
        
          const mentions = message.mentions.users;
        const userCache = client.users.cache;
        const mentioned = userCache.get(args[0]) || userCache.find(user => user.username === args[0]) || mentions.first();

        const _userDB = await userDB.findById(message.author.id);
        const mentionedDB = await userDB.findById(mentioned?.id);
        const mentionArgs = !!mentions ? true : !!mentioned ? true : false;

        const messageBl = _userDB?.blacklist["impostor"] ? MESSAGE.BL.AUTHOR : MESSAGE.BL.USER;

        const isDeveloper = client.developers.includes(message.author.id); // Black list
        
        if ((_userDB?.blacklist["impostor"] && command.name !== "suporte-bl" && command.name !== "rblack-list") || 
            (mentionedDB?.blacklist["impostor"] && mentionArgs)) {
            const bannedUserName = mentionedDB ? mentioned.username : message.author.username;
        


            if (!isDeveloper || (isDeveloper && command.name !== "rblack-list")) {
                return message.reply(FormatEmoji(messageBl.replace(/<name>|<command>/g, (matched) => {
                    return matched === "<name>" ? bannedUserName : `${client.prefix}suporte-bl`;
                })));
            }
        }

        if (cmdName === 'registrar') {
            try {
                command.run(client, message, args);
            } catch (error) {
                console.error('Erro ao executar o comando:', error);
            }
            return; 
        }
       
        const authorDB = await userDB.findById(message.author.id);

        if (!authorDB) {
           const registrarr = MESSAGE.DB.AUTHOR
            .replace(/<name>/g, message.author.username)
            .replace(/<command>/g, `${client.prefix}registrar`);
           return message.reply(client.FormatEmoji(registrarr));
        }

        if (message.mentions.users.size > 0) {
            const mentioned = message.mentions.users.first();
            const mentionedDB = await userDB.findById(mentioned.id);

            if (!mentionedDB) {
                const mencao = MESSAGE.DB.USER.replace(/<name>/g, message.author);
                return message.reply(client.FormatEmoji(mencao));
            }
        }

const PermissionTranslator = (input) => {
    return input.map(permission => `${permissions[permission]} ` || input).join(', ');
};
        if (command.UserPermission && !message.member.permissions.has(command.UserPermission || []))
        return message.channel.send(FormatEmoji(MESSAGE.PERMISSION.AUTHOR.replace(/<name>|<PERMISSION>/g, (matched) => { return matched === "<name>" ? message.author : PermissionTranslator(command.UserPermission) })));

        if (command.ClientPermission && !message.guild.members.cache.get(client.user.id).permissions.has(command.ClientPermission || []))
        return message.channel.send(FormatEmoji(MESSAGE.PERMISSION.CLIENT.replace(/<name>|<PERMISSION>/g, (matched) => { return matched === "<name>" ? message.author : PermissionTranslator(command.ClientPermission) })));



        const miliseconds = client.cooldowns.get(`${message.author.id}-${command.name}`) / 1000;
        
        if (client.cooldowns.has(`${message.author.id}-${command.name}`))
        return message.channel.send(FormatEmoji(MESSAGE.TEMPO.replace(/<name>|<cooldown>/g, (matched) => { return matched === "<name>" ? message.author: Math.trunc(miliseconds) })));
        
        client.cooldowns.set(`${message.author.id}-${command.name}`, Date.now() + 7000);
        setTimeout(() => { client.cooldowns.delete(`${message.author.id}-${command.name}`) }, 7000);

        try {
            command.run(client, message, args);
        } catch (error) {
            console.error('Erro ao executar o comando:', error);
        }    
        
        
        const prefix = client.prefix;
        if (message.content.startsWith(prefix)) {
            let command = message.content.slice(prefix.length).trim().split(/ +/g).shift().toLowerCase();
        
            const commandObject = client.commands.get(command) || client.commands.find(cmd => cmd.aliases?.includes(command));
            if (commandObject) {
                command = commandObject.name;
            }
        
            const { name: serverName, memberCount } = message.guild;
            const guild = message.guild;
            const owner = await guild.fetchOwner();
            const ownerUsername = owner.user.username;
            
            const logChannel = client.channels.cache.get('1205971779558834176');
        
            const embed = new Discord.EmbedBuilder()
                .setAuthor({name: message.author.username, iconURL: message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 })})
                .setDescription(`\n> - **\`🔮\` › Dimensão:** \`${serverName}\`\n> - **\`🐉\` › Dono:** \`${ownerUsername}\`\n> - **\`⭐\` › Aventureiros:** \`${memberCount}\``)
                .setColor('#97989a');
            
            await logChannel.send({content:`Comando usado: **\`${command}\`**`, embeds: [embed]});
        }        
    }
}