const Discord = require('discord.js');

function MeiButton(buttons) {
  const row = new Discord.ActionRowBuilder();

  for (const { label, customId, style, url, emoji } of buttons) {
    const button = new Discord.ButtonBuilder()
      .setLabel(label)
      .setStyle(style);

      /* Valores que podem ser passado para o Style
      Primary || 1
      Secondary || 2
      Success || 3
      Danger || 4
      Link || 5 */

  if (emoji) {
   button.setEmoji(emoji);
}

  if (url) {
   button.setURL(url);
} else {
   button.setCustomId(customId);
}

    row.addComponents(button);
  }
  return row;
}

module.exports = MeiButton;
