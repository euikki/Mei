const Discord = require('discord.js');
const Canvas = require('canvas');
const User = require('../../mongoDB/schemas/userschema');
const MeiButton = require('../../functions/buttonBuilder')
Canvas.registerFont('./src/assets/fonts/segoepr.ttf', { family: 'Segoe' });


module.exports = {
  name: 'perfil',
  aliases: ["profile", "p"],
  description: 'ain bolsonaro',
  category: "members",
  run: async (client, message, args) => {

    const canvas = Canvas.createCanvas(1535, 863);
    const ctx = canvas.getContext('2d');

    const user = message.mentions.users.first() || message.author;
    const userDB = await User.findOne({ _id: user.id });

    const Avatar = user.avatarURL({ extension: 'png', dynamic: true, size: 2048 });

    const userBackground = await Canvas.loadImage(userDB.banner);
    const background = await Canvas.loadImage('https://i.imgur.com/JHTnTT6.png');
    const avatar = await Canvas.loadImage(Avatar);

    let button = MeiButton([
      {label: "Alterar Sobre mim", customId:`[about, ${message.author.id}]`,style: "Secondary", emoji: client.FormatEmoji("{about}")}
    ])

    ctx.drawImage(userBackground, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
 
    ctx.font = '45px Arial'; // User Name
    ctx.fillStyle = '#9eec94';
    ctx.fillText(user.username, 500, 113);

    ctx.font = '38px Arial'; // User Id
    ctx.fillStyle = '#9eec94';
    ctx.fillText(user.id, 440, 177);
    
    ctx.font = '38px Arial'; // User Fragments
    ctx.fillStyle = '#9eec94';
    ctx.fillText(`${userDB.bolso.toLocaleString()}`, 610, 250);
    
    ctx.font = '45px Arial'; // User Honor
    ctx.fillStyle = '#9eec94';
    ctx.fillText(userDB.honor, 1330, 690);
    
    ctx.font = '38px Segoe'; // User About
    ctx.fillStyle = '#ffffff';
    ctx.fillText(userDB.aboutme, 40, 750);
    
    let Tcirculo = 150; // Avatar and Circle
    let X = 185;
    let Y = 170;
  
    ctx.arc(X, Y, Tcirculo, 0, Math.PI * 2, true); 
    ctx.strokeStyle = "#749270"; 
    ctx.lineWidth = 8; 
    ctx.closePath();
    ctx.stroke();
    ctx.clip(); 
  
    let Lavatar = 330;
    let Aavatar = 330;
    let xAvatar = X - Lavatar / 2; 
    let yAvatar = Y - Aavatar / 2; 
    ctx.drawImage(avatar, xAvatar, yAvatar, Lavatar, Aavatar);
    
    try {
      const Message = await message.reply(client.FormatEmoji(`{e:dance} ${message.author}, estou gerando o perfil.`));
      const profile = new Discord.AttachmentBuilder(canvas.toBuffer(), 'perfil.png');
  
      await Message.edit({ content: `${message.author}`, files: [profile], components: [button] })
    } catch (error) {
      console.error(error);
      Message.edit(client.FormatEmoji(`{e:erro} Rapaz, não consegui gerar o perfil.`));
    }
  }
};
