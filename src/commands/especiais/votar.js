const Discord = require('discord.js');
const Topgg = require("@top-gg/sdk");
const userDB = require('../../mongoDB/schemas/userschema')
const MeiButton = require('../../functions/buttonBuilder')

module.exports = {
    name:"votar",
    description:"Votarr",
    run: async (client, message) => {

        const topgg = process.env.topgg
        const top = new Topgg.Api(topgg)

        let User = await userDB.findOne({_id: message.author.id})
        const hasVoted = await top.hasVoted(message.author.id)

        const timeLeft = User.time_vote + 12 * 60 * 60 * 1000 - Date.now();
        
        if (timeLeft > 0) {
            return message.reply(client.FormatEmoji(`{e:erro} Você só pode votar a cada **12 Horas**, ainda resta um tempinho até lá: <t:${Math.floor((Date.now() + timeLeft) / 1000)}:R>.`));
        }
        
        if(!hasVoted){
            let button = MeiButton([
                {label:"Vote", style:"Link", url:"https://top.gg/bot/1189612874449031330"}
            ])
            
            let embed = new Discord.EmbedBuilder()
            .setTitle(client.FormatEmoji("{top} ⎯⎯ Vote na sua Guardiã!"))
            .setDescription(`> - Me ajude a se expandir votando em mim na [Top GG](https://top.gg/bot/1189612874449031330).`)
            .setFooter({text: "E o pix, nada ainda?", iconURL: client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 })})
            .setColor('#97989a')
            .setFields(
                {name:"💜 › Vote na mei para presidente.", value: "Seu voto é importante para mim, pois a cada voto eu posso alcançar cada vez mais dimensões e proteger ainda mais viajantes!", inline: true},
                {name:"❗ › Aviso!", value: "Após votar utilize o comando novamente para resgatar a recompensa.", inline: true})
   
            return await message.reply({embeds: [embed], components: [button]})
   
        } else {
   
            User.votes += 1;
            User.fragments += 1500;
            User.time_vote = Date.now();
            await User.save()

            let embedd = new Discord.EmbedBuilder()
            .setTitle(client.FormatEmoji("{top} ⎯⎯ Vote na sua Guardiã!"))
            .setDescription(`> - Obrigada pelo seu voto **${message.author.username}**, por esse seu grande feito você acaba de ganhar **1.500 Fragmentos!**\n- Agora você possui um total de ${User.votes.toLocaleString()}** votos**`)
            .setFooter({text: "Thank you little traveler 💜☕", iconURL: client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 })})
            .setColor("#a14bee")
            
            return await message.reply({embeds: [embedd]})
        }
    }
}
