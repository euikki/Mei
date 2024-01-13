const Discord = require("discord.js")
const User = require('../../mongoDB/schemas/userschema');

module.exports = {
  name: "code",
  description: "bah",
  restrito: true,

  run: async(client, message, args) => {

//let bah = client.user.username;

let embed = new Discord.EmbedBuilder()
//.setAuthor({name: `${bah}`, iconURL: client.user.displayAvatarURL()})
.setThumbnail(`https://media.discordapp.net/attachments/1180951879182725150/1183847709740908606/estrela-cadente.png?ex=6589d318&is=65775e18&hm=31914ffa9fcd16f8855b4f882f477195eb94588d3d39301befe29d96c6105a9d&=&format=webp&quality=lossless&width=409&height=409`)
.setColor("#2d6285")
.setDescription(client.FormatEmoji(`## {e:star} Avistou um cometa?
> - Os **\`Cometas\`** são resultados de um pequeno **sistema** meu!! atualmente temos **2 formas** de se obter um código "cometa";
## {e:ah} **Quais são essas 2 formas?**`))
.addFields(
  {
name:`**Primeira forma:**`,
value:`- Por meio da \`interação\` você consegue obter códigos, cada usuário tem uma chance de **05%** de obter um código!`,
inline: true
},
{
name: `**Segunda forma:**`, 
value:`- Essa aqui é um pouco mais difícil, pois irá depender de um **código gerado** pelo **\`guardião\`**!`,
inline: true
},
{
  name: `**Observação**`, 
  value: '- Na maioria das vezes os códigos da **segunda forma** só são gerados em **datas comemorativas** ou **eventos**!',
  inline: false
  },
{
  name: client.FormatEmoji(`{e:gift} **O que eu ganho com esses códigos?**`),
  value:`- Atualmente por meio desses códigos um membro pode obter: \n> **Fragmentos** \`100%\`\n> **Cogumelos** \`100%\`\n> **Insígnias** \`7%\`\n> **Títulos** \`3%\`\n- Em dias de eventos se pode obter **Itens especiais** com \`43%\` de chance de drop.`,
  inline: false
  }

)

let botao = new Discord.ActionRowBuilder() .addComponents(
  new Discord.StringSelectMenuBuilder()
  .setPlaceholder(`🌟 - Resgate agora!`)
  .setCustomId(`abrir`)
  .addOptions(
    {
        label: "Abrir painel",
        description: "Aperte e adicione o seu código!",
        emoji: "🎁",
        value: "1"
    } 
))

message.channel.send({content:`ok`, embeds:[embed] ,components: [botao]}) 

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isStringSelectMenu() || interaction.values[0] !== '1') return;

  const modal = new Discord.ModalBuilder()
        .setCustomId(`Embed`)
        .setTitle(`( 🌠 ) Resgatar Codígo`)

    const codigoInput = new Discord.TextInputBuilder()
        .setCustomId(`codigo`)
        .setLabel(`Código`)
        .setPlaceholder(`Insira o código aqui`)
        .setStyle(Discord.TextInputStyle.Short)

    const SegundaActionRow = new Discord.ActionRowBuilder()
        .addComponents(codigoInput);

    modal.addComponents(SegundaActionRow)

    await interaction.showModal(modal);
});

 client.on('interactionCreate', async (interaction) => {
    if (!interaction.isModalSubmit() || interaction.customId !== 'Embed') return;

    const cometa = interaction.fields.getTextInputValue(`codigo`);

    const userData = await User.findOne({ _id: interaction.user.id }); 
    if (!userData || !userData.cometa_codigos.includes(cometa)) { 
      return interaction.reply({ content: client.FormatEmoji(`> - {e:erro} O código especificado é inválido, ou provavelmente já foi resgatado, __tente novamente!__`), ephemeral: true });
    }

    const fragmentos = Math.floor(Math.random() * 4001) + 1000;
    const cogumelos = Math.floor(Math.random() * 16) + 5;

    let fragmentoss = fragmentos.toLocaleString('pt-BR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    userData.bolso += fragmentos;
    userData.cave += cogumelos;

    const index = userData.cometa_codigos.indexOf(cometa);
    if (index > -1) {
      userData.cometa_codigos.splice(index, 1);
    }
    await User.updateOne({ _idd: interaction.user.id }, { $set: { cometa_codigos: userData.cometa_codigos, bolso: userData.bolso, cave: userData.cave } });

    await userData.save();


            interaction.reply({ content: client.FormatEmoji(`> - {e:dance} Você resgatou o código e ganhou **({frag})** \`${fragmentoss}\`__ fragmentos e uma pequena quantia de  **({cogu})** __\`${cogumelos}\` cogumelos!__`), ephemeral: true });
        });
      }
    }