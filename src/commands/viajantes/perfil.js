const Discord = require('discord.js');
const Canvas = require('canvas');
Canvas.registerFont('./src/settings/fonts/keep-calm.ttf', {
  family: 'Calm',
});

module.exports = {
  name: 'perfil',
  aliases: ["profile", "p"],
  description: 'ain bolsonaro',
  run: async (client, message, args) => {

    const canvas = Canvas.createCanvas(900, 1157);
    const ctx = canvas.getContext('2d');

    const user = message.mentions.users.first() || message.author;
    const Avatar = user.avatarURL({ extension: 'png', dynamic: true, size: 2048 });

    const background = await Canvas.loadImage('https://i.imgur.com/xXYy3jT.png');
    const avatar = await Canvas.loadImage(Avatar);
  
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
    ctx.strokeStyle = "#2f3136";
    ctx.lineWidth = 15;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = '34px Calm';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(user.username, 188, 225);



// X  & Y 
var Tcirculo = 130;
var X = 188;
var Y = 225;
ctx.arc(X, Y, Tcirculo, 0, Math.PI * 2, true); 

ctx.strokeStyle = "#232428"; 
ctx.lineWidth = 8; 
ctx.closePath();
ctx.stroke();
ctx.clip(); 

//gambiarra do avatar
var Lavatar = 300;
var Aavatar = 300;

var xAvatar = X - Lavatar / 2; 
var yAvatar = Y - Aavatar / 2; 
ctx.drawImage(avatar, xAvatar, yAvatar, Lavatar, Aavatar);

    

const viajantes = new Discord.AttachmentBuilder(canvas.toBuffer(), 'perfil.png');
    message.channel.send({ files: [viajantes] });
  }
};
