let server = require("../mongoDB/schemas/guildschema")

module["exports"] = {
    type: 'interactionCreate',
    run: async (client, interaction) => {
        
        if (!interaction.isModalSubmit() || interaction.customId !== 'edit-values') return;
       
        let contentT = interaction.fields.getTextInputValue(`content-title`);
        const contentD = interaction.fields.getTextInputValue(`content-description`);
        const contentC = interaction.fields.getTextInputValue(`content-color`);

        if (contentT === "null") {
            contentT = null;
        }

        let updateValues = {
            "description": contentD, 
            "color": contentC 
        };

        if (contentT !== null) {
            updateValues.title = contentT;
        }

        await server.findOneAndUpdate({ _id: interaction.guild.id }, updateValues, { upsert: true });

        interaction.reply({ content: `Definido`, ephemeral: true });

    }
}
