const ServerModel = require('../mongoDB/schemas/guildschema');

module.exports = {
    type: 'guildDelete',
    run: async (client, guild) => {
        ServerModel.findByIdAndDelete(guild.id)
        .then(() => {
            console.log(`Servidor ${guild.id} removido do banco de dados.`);
            const logChannel = client.channels.cache.get('1204931090590990378');
                
            if (logChannel) {    
                logChannel.send(`## ❗ — Remove\n >>> - Nome & ID: **\`${guild.name}\` — (${guild.id})**\n- Id do Dono: **\`${guild.ownerId}\`**`);
            }
        })
        .catch(err => console.error(err));
    }
}
