const {
  MessageEmbed
} = require(`discord.js`);
const DBL = require('@top-gg/sdk');
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: `loop`,
  category: `Music`,
  aliases: [`repeat`, `l`],
  description: `Repeats the current song`,
  usage: `loopsong`,
  parameters: { "type": "music", "activeplayer": true, "previoussong": false },
  options: [
    {
      name: "type",
      type: 3,
      description: "Select loop song/loop queue",
      required: true,
      choices: [
        {
          name: "loop song",
          value: "song"
        },
        {
          name: "loop queue",
          value: "queue"
        }
      ]
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


      //if no args send error
      if (!args[0]) {
        const tdk = new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(`${emoji.msg.ERROR} Please add your method!`)
          .setDescription(`\`loop song\`\nIt will loop the current **Track** endlessly!\n\`loop queue\`\nIt will loop the whole Queue will be repeated endlessly!`)
        return message.channel.send({ embeds: [tdk] })
      }
      //if arg is somehow song / track
      if (args[0].toLowerCase() === `song` || args[0].toLowerCase() === `track` || args[0].toLowerCase() === `s` || args[0].toLowerCase() === `t`) {
        //Create the Embed
        let embed = new MessageEmbed()
          .setDescription(`${emoji.msg.repeat_mode} Track loop ${player.trackRepeat ? `Disabled` : `Enabled`}`)
          .setColor("#2F3136")
        //If Queue loop is enabled add embed info + disable it
        if (player.queueRepeat) {
          player.setQueueRepeat(false);
        }
        //toggle track repeat to the reverse old mode
        player.setTrackRepeat(!player.trackRepeat);
        //Send Success Message
        return message.channel.send({ embeds: [embed] })
      }
      //if input is queue
      else if (args[0].toLowerCase() === `queue` || args[0].toLowerCase() === `qu` || args[0].toLowerCase() === `q`) {
        //Create the Embed
        let embed = new MessageEmbed()
          .setDescription(`${emoji.msg.repeat_mode} Queue loop ${player.queueRepeat ? `Disabled` : `Enabled`}`)
          .setColor("#2F3136")
        //If Track loop is enabled add embed info + disable it
        if (player.trackRepeat) {
          player.setTrackRepeat(false);
        }
        //toggle queue repeat to the reverse old mode
        player.setQueueRepeat(!player.queueRepeat);
        //Send Success Message
        return message.channel.send({ embeds: [embed] });
      }
      //if no valid inputs, send error
      else {
        const ror = new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(`${emoji.msg.ERROR} Please add your method!`)
          .setDescription(`\`loop song\`\nIt will loop the current **Track** endlessly!\n\`loop queue\`\nIt will loop the whole Queue will be repeated endlessly!`)
        return message.channel.send({ embeds: [ror] });
      }
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
      const choose = interaction.options.getString("type")
      if (choose === 'song') {
        let embed = new MessageEmbed()
          .setDescription(`${emoji.msg.repeat_mode} Track loop ${player.trackRepeat ? `Disabled` : `Enabled`}`)
          .setColor("#2F3136")
        if (player.queueRepeat) {
          player.setQueueRepeat(false);
        }
        player.setTrackRepeat(!player.trackRepeat);
        return interaction.reply({ embeds: [embed] })
      }
      if (choose === 'queue') {
        let embed = new MessageEmbed()
          .setDescription(`${emoji.msg.repeat_mode} Queue loop ${player.queueRepeat ? `Disabled` : `Enabled`}`)
          .setColor("#2F3136")
        if (player.trackRepeat) {
          player.setTrackRepeat(false);
        }
        player.setQueueRepeat(!player.queueRepeat);
        return interaction.reply({ embeds: [embed] });
      }
    } catch (e) {
      console.log(String(e.stack).bgRed)
      const emesdf = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setAuthor(`An Error Occurred`)
        .setDescription(`\`\`\`${e.interaction}\`\`\``);
      return interaction.reply({ embeds: [emesdf] });

    }
  }
};