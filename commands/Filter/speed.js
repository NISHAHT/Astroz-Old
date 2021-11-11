const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const DBL = require('@top-gg/sdk');
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { monitorEventLoopDelay } = require('perf_hooks');
const { inflateRaw } = require('zlib');
module.exports = {
  name: `speed`,
  category: `Filter`,
  aliases: [ ],
  description: `Allows you to change the speed of current playing track`,
  usage: `speed <Multiplicator> | Multiplicator could be: 0  -  3`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  options: [
    {
      name: 'speed',
      description: 'Provide Speed Between 0 - 3',
      required: true,
      type: 'STRING'
    }
  ],
  run: async (client, message, args, guildData, player, prefix) => {

    try {
      if (!args.length) {
        const dfi = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} Please include the Multiplicator\n\nUsage: \`${prefix}speed <Multiplicator>\`\nExample: \`${prefix}speed 1.5\``)
        return message.channel.send({embeds: [dfi]})
      }
      if(isNaN(args[0])) {
        const idk = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} The Multiplicator must be a Number\n\nUsage: \`${prefix}speed <Multiplicator>\`\nExample: \`${prefix}speed 1.5\``)
        return message.channel.send({embeds: [idk]})
      }
      if(Number(args[0]) >= 3 || Number(args[0]) <= 0) {
        const ppp = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} Multiplicator out of range | Must be between 0 and 3\n\nUsage: \`${prefix}speed <Multiplicator>\`\nExample: \`${prefix}speed 1.5\``)
        return message.channel.send({embeds: [ppp]})
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
              "speed": Number(args[0]),
              "pitch": 1.0,
              "rate": 1.0
          },
      });
      const lll = new MessageEmbed()
      .setColor("#2F3136")
      .setDescription(`${emoji.msg.SUCCESS} S*peed set to \`${args[0]}\` [**It might take up to 5 seconds until you hear the Filter**]`)
      return message.channel.send({embeds: [lll]});
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
      const choose = interaction.options.getString("speed")
      if(isNaN(choose)) {
        const idk = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} The Multiplicator must be a Number\n\nUsage: \`${prefix}speed <Multiplicator>\`\nExample: \`${prefix}speed 1.5\``)
        return interaction.reply({embeds: [idk]})
      }
      if(Number(choose) >= 3 || Number(choose) <= 0) {
        const ppp = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} Multiplicator out of range | Must be between 0 and 3\n\nUsage: \`${prefix}speed <Multiplicator>\`\nExample: \`${prefix}speed 1.5\``)
        return interaction.reply({embeds: [ppp]})
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
              "speed": Number(choose),
              "pitch": 1.0,
              "rate": 1.0
          },
      });
      const lll = new MessageEmbed()
      .setColor("#2F3136")
      .setDescription(`${emoji.msg.SUCCESS} S*peed set to \`${choose}\` [**It might take up to 5 seconds until you hear the Filter**]`)
      return interaction.reply({embeds: [lll]});
    } catch (e) {
      console.log(String(e.stack).bgRed)
      const emesdf = new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setAuthor(`An Error Occurred`)
      .setDescription(`\`\`\`${e.interaction}\`\`\``);
      return interaction.reply({embeds: [emesdf]})}
  }
};