const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const DBL = require('@top-gg/sdk');
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: `pitch`,
  category: `Filter`,
  aliases: [ ],
  description: `Allows you to change the PITCH of the TRACK`,
  usage: `pitch <Multiplicator> | Multiplicator could be: 0  -  3`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  options: [
    {
      name: 'pitch',
      description: 'Provide Pitch Between 0 - 3',
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
        const isdf = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} Please include the Multiplicator\n\nUsage: \`${prefix}pitch <Multiplicator>\`\nExample: \`${prefix}pitch 1.2\``)
        return message.channel.send({embeds: [isdf]})
      }
      if(isNaN(args[0])) {
        const oee = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} The Multiplicator must be a Number\n\nUsage: \`${prefix}pitch <Multiplicator>\`\nExample: \`${prefix}pitch 1.2\``)
        return message.channel.send({embeds: [oee]})
      }
      if(Number(args[0]) >= 3 || Number(args[0]) <= 0) {
        const opp = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} Range must be between 0 and 3\n\nUsage: \`${prefix}pitch <Multiplicator>\`\nExample: \`${prefix}pitch 1.2\``)
        return message.channel.send({embeds: [opp]})
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
          "pitch": Number(args[0]),
          "rate": 1.0
        },
      });
      const ded = new MessageEmbed()
      .setColor("#2F3136")
      .setDescription(`${emoji.msg.SUCCESS} Pitch set to \`${args[0]}\` [**It might take up to 5 seconds until you hear the Filter**]`)
      return message.channel.send({embeds: [ded]});
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
      const choose = interaction.options.getString("pitch")
      if(isNaN(choose)) {
        const oee = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} The Multiplicator must be a Number\n\nUsage: \`${prefix}pitch <Multiplicator>\`\nExample: \`${prefix}pitch 1.2\``)
        return message.channel.send({embeds: [oee]})
      }

      if(Number(choose) >= 3 || Number(choose) <= 0) {
        const opp = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} Range must be between 0 and 3\n\nUsage: \`${prefix}pitch <Multiplicator>\`\nExample: \`${prefix}pitch 1.2\``)
        return interaction.reply({embeds: [opp]})
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
          "pitch": Number(choose),
          "rate": 1.0
        },
      });
      const ded = new MessageEmbed()
      .setColor("#2F3136")
      .setDescription(`${emoji.msg.SUCCESS} Pitch set to \`${choose}\` [**It might take up to 5 seconds until you hear the Filter**]`)
      return interaction.reply({embeds: [ded]});
    } catch (e) {
      console.log(String(e.stack).bgRed)
      const emesdf = new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setAuthor(`An Error Occurred`)
      .setDescription(`\`\`\`${e.interaction}\`\`\``);
      return interaction.reply({embeds: [emesdf]})
    }
  },
};