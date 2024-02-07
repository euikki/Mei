const { emoji } = require('../../constants/emojis.json');

function FormatEmoji(string) {
    const data = Object.entries(emoji);
    const regex = new RegExp(data.map(emoji => `\\{${emoji[0]}\\}`).join('|'), 'g');

    return string
        .replace(/{e:(.*?)}/g, (_, emojiName) => `**(${data.find(([name, _]) => name === emojiName)?.[1] || emojiName}) ›**`)
        .replace(regex, (matched) => data.find(([name, _]) => name == matched.slice(1, -1))[1]);
}

module["exports"] = { FormatEmoji }