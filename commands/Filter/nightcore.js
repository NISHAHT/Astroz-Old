const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const DBL = require('@top-gg/sdk');
module.exports = {
  name: `nightcore`,
  category: `Filter`,
  aliases: [ ],
  description: `Applies a Nightcore Filter`,
  usage: `nightcore`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
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

      
      player.node.send({
        op: "filters",
        guildId: message.guild.id,
        equalizer: player.bands.map((gain, index) => {
            var Obj = {
              "band": 0,
              "gain": 0,
            };
            Obj.band = Number(index);
            Obj.gain = Number(gain)
            return Obj;
          }),
        timescale: {
              "speed": 1.165,
              "pitch": 1.125,
              "rate": 1.05
          },
      });
      const eofr = new MessageEmbed()
      .setColor("#2F3136")
      .setDescription(`${emoji.msg.SUCCESS} Applying the \`NIGHTCORE\` Filter [**It might take up to 5 seconds until you hear the Filter**]`)
      return message.channel.send({embeds: [eofr]});
    } catch (e) {
      console.log(String(e.stack).bgRed)
      const emesdf = new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setAuthor(`An Error Occurred`)
      .setDescription(`\`\`\`${e.message}\`\`\``);
      return message.channel.send({embeds: [emesdf]})
    }
  },
  runslash: async (client, interaction, guildData, player, prefix) => {
    try {
      player.node.send({
        op: "filters",
        guildId:interaction.guild.id,
        equalizer: player.bands.map((gain, index) => {
            var Obj = {
              "band": 0,
              "gain": 0,
            };
            Obj.band = Number(index);
            Obj.gain = Number(gain)
            return Obj;
          }),
        timescale: {
              "speed": 1.165,
              "pitch": 1.125,
              "rate": 1.05
          },
      });
      const eofr = new MessageEmbed()
      .setColor("#2F3136")
      .setDescription(`${emoji.msg.SUCCESS} Applying the \`NIGHTCORE\` Filter [**It might take up to 5 seconds until you hear the Filter**]`)
      return interaction.reply({embeds: [eofr]});
    } catch (e) {
      console.log(String(e.stack).bgRed)
      const emesdf = new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setAuthor(`An Error Occurred`)
      .setDescription(`\`\`\`${e.interaction}\`\`\``);
      return interaction.reply({embeds: [emesdf]})}
  }
};