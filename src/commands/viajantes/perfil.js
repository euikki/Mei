const Discord = require('discord.js');
const Canvas = require('canvas');
const User = require('../../mongoDB/schemas/userschema');
const MeiButton = require('../../functions/buttonBuilder');
const abbreviate = require('number-abbreviate');
Canvas.registerFont('./src/assets/fonts/Roboto-Light.ttf',{ family: 'Roboto' });


module.exports = {
  name: 'perfil',
  aliases: ["profile", "p"],
  description: '🔮 Veja suas informações em um perfil belo e compacto.',
  category: "members",
  run: async (client, message, args) => {

    const canvas = Canvas.createCanvas(1440, 720);
    const ctx = canvas.getContext('2d');

    const user = message.mentions.users.first() || message.author;
    const userDB = await User.findOne({ _id: user.id });

    const Avatar = user.avatarURL({ extension: 'png', dynamic: true, size: 2048 });

    const userBackground = await Canvas.loadImage(userDB.banner);
    const background = await Canvas.loadImage('https://i.imgur.com/XBrxIUq.png');
    const avatar = await Canvas.loadImage(Avatar);

    let button = MeiButton([
      {label: "Alterar Sobre mim", customId:`[about, ${message.author.id}]`,style: "Secondary", emoji: client.FormatEmoji("{about}")}
    ])

    ctx.drawImage(userBackground, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
 
    ctx.font = '55px Arial'; // User Name
    ctx.fillStyle = '#ffffff';
    ctx.fillText(limitText(user.username, 15), 360, 280);

    ctx.font = '35px Arial'; // User Id
    ctx.fillStyle = '#757575';
    ctx.fillText(user.id, 348, 314);
    
    ctx.font = '30px Arial'; // User Fragments
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${userDB.fragments.toLocaleString()}`, 320, 434);
    
    ctx.font = '30px Arial'; // User Mushrooms
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${userDB.mushroom.toLocaleString()}`, 335, 475); 
    
    ctx.font = '30px Arial'; // User Honor
    ctx.fillStyle = '#ffffff';
    ctx.fillText(abbreviate(userDB.honor), 1270, 60);


     
    function limitText(text, maxLength) {
      return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    }

    let aboutme =  limitText(userDB.aboutme, 160); // User About
    let maxChar = 70;
    let lineHeight = 30; 
    let textStartX = 35; 
    let textStartY = 630; 
    
    ctx.font = '28px Roboto';
    ctx.fillStyle = '#ffffff';
    
    let lines = [];
    let currentLine = '';
    
    for(let i = 0; i < aboutme.length; i++) {
      if(i !== 0 && i % maxChar === 0) {
        lines.push(currentLine);
        currentLine = '';
      }
      currentLine += aboutme[i];
    }
    lines.push(currentLine);
    
    for(let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], textStartX, textStartY + (i * lineHeight));
    }
    
    let x = 28, y = 70, avatarSize = 320; // User Avatar
    ctx.beginPath();
    ctx.arc(x + avatarSize / 2, y + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, x, y, avatarSize, avatarSize);

      
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
