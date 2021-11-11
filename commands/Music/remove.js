const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const DBL = require('@top-gg/sdk');
module.exports = {
  name: `remove`,
  category: `Music`,
  aliases: [`rt`, `removetrack`],
  description: `Removes a track from the Queue`,
  usage: `remove <track number>`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  options: [
    {
      name: 'number',
      description: 'Provide Number Of Tract To Remove!',
      required: true,
      type: 'STRING'
    }
  ],
  run: async (client, message, args, guildData, player, prefix) => {
    try{

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

      //if no args return error
      if (!args[0]) {
        const ddd = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} Please add the Track you want to remove!\n\nExample: \`removetrack ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2 }\``)
        return message.channel.send({embeds: [ddd]})
      }
      //if the Number is not a valid Number return error
      if (isNaN(args[0])) {
        const tttt = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} It has to be a valid Queue Number!\n\nExample: \`removetrack ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2 }\``)
        return message.channel.send({embeds: [tttt]})
      }
      //if the Number is too big return error
      if (Number(args[0]) > player.queue.size) {
        const yyy = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} Your Song must be in the Queue!\n\nExample: \`removetrack ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2 }\``)
        return message.channel.send({embeds: [yyy]})
      }
      //remove the Song from the QUEUE
      player.queue.remove(Number(args[0]) - 1);
      //Send Success Message
      const ppp = new MessageEmbed()
      .setDescription(`${emoji.msg.cleared} I removed the track at position: \`${Number(args[0])}\``)
      .setColor("#2F3136")
      return message.channel.send({embeds: [ppp]});
    } catch (e) {
      console.log(String(e.stack).bgRed)
      const emesdf = new MessageEmbed()
			.setColor(ee.wrongcolor)
			.setAuthor(`An Error Occurred`)
			.setDescription(`\`\`\`${e.message}\`\`\``);
			return message.channel.send({embeds: [emesdf]});
    }
  },
  runslash: async (client, interaction, guildData, player, prefix) => {
    try {
      const choose = interaction.options.getString("number")
      if (isNaN(choose)) {
        const tttt = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} It has to be a valid Queue Number!\n\nExample: \`removetrack ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2 }\``)
        return interaction.reply({embeds: [tttt]})
      }
      //if the Number is too big return error
      if (Number(choose) > player.queue.size) {
        const yyy = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} Your Song must be in the Queue!\n\nExample: \`removetrack ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2 }\``)
        return interaction.reply({embeds: [yyy]})
      }
      //remove the Song from the QUEUE
      player.queue.remove(Number(choose) - 1);
      //Send Success Message
      const ppp = new MessageEmbed()
      .setDescription(`${emoji.msg.cleared} I removed the track at position: \`${Number(choose)}\``)
      .setColor("#2F3136")
      return interaction.reply({embeds: [ppp]});
    } catch (e) {
      console.log(String(e.stack).bgRed)
      const emesdf = new MessageEmbed()
			.setColor(ee.wrongcolor)
			.setAuthor(`An Error Occurred`)
			.setDescription(`\`\`\`${e.interaction}\`\`\``);
			return interaction.reply({embeds: [emesdf]});
    }
  },
};