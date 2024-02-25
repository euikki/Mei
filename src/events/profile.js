let User = require("../mongoDB/schemas/userschema")
const MeiButton = require('../functions/buttonBuilder')

module["exports"] = {
    type: 'interactionCreate',
    run: async (client, interaction) => {        
        if (!interaction.isModalSubmit() || interaction.customId !== 'about-me') return;
        
        let aboutMe = interaction.fields.getTextInputValue(`me`);
        const user = await User.findOne({ _id: interaction.user.id });
        
        // Save the new about me
        user.aboutme = aboutMe;
        await user.save();

        // Disable the button
        let button = MeiButton([
          {label: "Alterar Sobre mim", customId:`[about, ${interaction.user.id}]`,style: "Secondary", emoji: client.FormatEmoji("{about}"), disabled: true}
        ])

        // Edit the message with the disabled button
        await interaction.message.edit({ components: [button] })

        interaction.reply({ content: `Definido`, ephemeral: true });
    }
}
