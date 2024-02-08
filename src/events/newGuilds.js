const ServerModel = require('../mongoDB/schemas/guildschema');

module.exports = {
    type: 'guildCreate',
    run: async (client, guild) => {
        const server = new ServerModel({ _id: guild.id });
        server.save()
        .then(() => {
            console.log(`Servidor ${guild.id} adicionado ao banco de dados.`);
            const logChannel = client.channels.cache.get('1204931090590990378');
                
            if (logChannel) {    
                logChannel.send(`## 📌 — Novo Servidor\n >>> - Nome & ID: **\`${guild.name}\` — (${guild.id})**\n- Id do Dono: **\`${guild.ownerId}\`**`);
            }
        })
        .catch(err => console.error(err));
    }
}