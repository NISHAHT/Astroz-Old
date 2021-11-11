const Discord = require(`discord.js`);
const {
  MessageEmbed
} = require(`discord.js`);
const DBL = require('@top-gg/sdk');
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const playermanager = require(`../../handlers/playermanager`);
module.exports = {
  name: `autoplay`,
  category: `Music`,
  aliases: [`ap`, `toggleauto`, `toggleautoplay`, `toggleap`],
  description: `Toggles Autoplay on/off`,
  usage: `autoplay`,
  parameters: { "type": "music", "activeplayer": true, "previoussong": false },
  run: async (client, message, args, guildData, player, prefix) => {
    try {

      try {
        const dbl = new DBL.Api("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgxMTEwOTcxNTQzMzYxOTQ3NiIsImJvdCI6dHJ1ZSwiaWF0IjoxNjM1Mzg5NzkwfQ.myTNdA27ZNTq1a2nLvsESRsFbiuBMEvh9j3eRcTutqA", client);
        let voted = await dbl.hasVoted(message.author.id);
        if(!voted) {
          const vote = new MessageEmbed()
          .setTitle("Error!")
          .setFooter(ee.footertext, ee.footericon)
          .setColor("RED")
          .setTimestamp()
          .setDescription(`${emoji.msg.ERROR} you must vote me [here](https://top.gg/bot/${client.user.id}/vote) to use this command\n [**Click Here**](https://top.gg/bot/${client.user.id}/vote)`)
          return message.channel.send({embeds: [vote]});
        }
      } catch {/** */}


      player.set(`autoplay`, !player.get(`autoplay`))
      //Send Success Message
      const embed = new MessageEmbed()
        .setDescription(`${player.get(`autoplay`) ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`} Autoplay\n\nTo ${player.get(`autoplay`) ? `disable` : `enable`} it type: \`${prefix}autoplay\``)
        .setColor("#2F3136")
      return message.channel.send({ embeds: [embed] });
    } catch (e) {
      console.log(String(e.stack).bgRed)
      const emesdf = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setAuthor(`An Error Occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``);
      return message.channel.send({ embeds: [emesdf] });
    }
  },
  runslash: async (client, interaction, guildData, player, prefix) => {
    try {
      player.set(`autoplay`, !player.get(`autoplay`))
      //Send Success Message
      const embed = new MessageEmbed()
        .setDescription(`${player.get(`autoplay`) ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`} Autoplay\n\nTo ${player.get(`autoplay`) ? `disable` : `enable`} it type: \`${prefix}autoplay\``)
        .setColor("#2F3136")
      return interaction.reply({ embeds: [embed] });
    } catch (e) {
      console.log(String(e.stack).bgRed)
      const emesdf = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setAuthor(`An Error Occurred`)
        .setDescription(`\`\`\`${e.interaction}\`\`\``);
      return interaction.reply({ embeds: [emesdf] })
    }
  }
}