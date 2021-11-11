const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const DBL = require('@top-gg/sdk');
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: `rate`,
  category: `Filter`,
  aliases: [ ],
  description: `Allows you to change the RATE of the TRACK`,
  usage: `rate <Multiplicator> | Multiplicator could be: 0  -  3`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  options: [
    {
      name: 'rate',
      description: 'Provide Rate Between 0 - 3',
      required: true,
      type: 'STRING'
    }
  ],
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
      if (!args.length) {
        const tt = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} Please include the Multiplicator\n\nUsage: \`${prefix}rate <Multiplicator>\`\nExample: \`${prefix}rate 1.5\``)
        return message.channel.send({embeds: [tt]})
      }
      if(isNaN(args[0])) {
        const wee = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} The Multiplicator must be a Number\n\nUsage: \`${prefix}rate <Multiplicator>\`\nExample: \`${prefix}rate 1.5\``)
        return message.channel.send({embeds: [wee]})
      }
      if(Number(args[0]) >= 3 || Number(args[0]) <= 0) {
        const wer = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} Range must be between 0 and 3\n\nUsage: \`${prefix}rate <Multiplicator>\`\nExample: \`${prefix}rate 1.5\``)
        return message.channel.send({embeds: [wer]})
      }
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
              "speed": 1.0,
              "pitch": 1.0,
              "rate": Number(args[0])
          },
      });
      const ddw = new MessageEmbed()
      .setColor("#2F3136")
      .setDescription(`${emoji.msg.SUCCESS} Rate set to \`${args[0]}\`[**It might take up to 5 seconds until you hear the Filter**]`)
      return message.channel.send({embeds: [ddw]});
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
      const choose = interaction.options.getString("rate")
      if(isNaN(choose)) {
        const wee = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} The Multiplicator must be a Number\n\nUsage: \`${prefix}rate <Multiplicator>\`\nExample: \`${prefix}rate 1.5\``)
        return interaction.reply({embeds: [wee]})
      }
      if(Number(choose) >= 3 || Number(choose) <= 0) {
        const wer = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} Range must be between 0 and 3\n\nUsage: \`${prefix}rate <Multiplicator>\`\nExample: \`${prefix}rate 1.5\``)
        return interaction.reply({embeds: [wer]})
      }
      player.node.send({
        op: "filters",
        guildId: interaction.guild.id,
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
              "speed": 1.0,
              "pitch": 1.0,
              "rate": Number(choose)
          },
      });
      const ddw = new MessageEmbed()
      .setColor("#2F3136")
      .setDescription(`${emoji.msg.SUCCESS} Rate set to \`${choose}\`[**It might take up to 5 seconds until you hear the Filter**]`)
      return interaction.reply({embeds: [ddw]});
    } catch (e) {
      console.log(String(e.stack).bgRed)
      const emesdf = new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setAuthor(`An Error Occurred`)
      .setDescription(`\`\`\`${e.message}\`\`\``);
      return interaction.reply({embeds: [emesdf]})
    }    
  }
};