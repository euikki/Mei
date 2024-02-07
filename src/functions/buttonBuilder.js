const Discord = require('discord.js');

function MButton({ label, customId, style, url, emoji }) {
  const button = new Discord.ButtonBuilder()
    .setLabel(label)
    .setStyle(style)
    .setEmoji(emoji);

  if (url) {
    button.setURL(url);
  } else {
    button.setCustomId(customId);
  }

  return new Discord.ActionRowBuilder().addComponents(button);
}

module.exports = MButton;