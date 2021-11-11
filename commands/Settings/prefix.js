const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const DBL = require('@top-gg/sdk');
module.exports = {
  name: `prefix`,
  aliases: [`prefix`],
  category: `Settings`,
  description: `Let's you change the Prefix of the BOT`,
  usage: `prefix <NEW PREFIX>`,
  memberpermissions: [`ADMINISTRATOR`],
  options: [
    {
      name: 'prefix',
      description: 'Provide Prefix To Set New!',
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
      //get the current prefix from the database
      let prefix = guildData.prefix;
      //if not in the database for some reason use the default prefix
      if (prefix === null) prefix = config.prefix;
      //if no args return error
      if (!args[0]) {
        const yyy = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} Please provide a new prefix!\nCurrent prefix: \`${prefix}\``)
        return message.channel.send({embeds: [yyy]})
      }
      //if there are multiple arguments
      if (args[1]) {
        const op = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} The prefix can\'t have two spaces`)
        return message.channel.send({embeds: [op]});
      }
      //if the prefix is too long
      if (args[0].length > 5) {
        const ttt = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} The prefix can\'t be Longer then \`5\``)
        return message.channel.send({embeds: [ttt]})
      }
      //set the new prefix
      guildData.prefix = args[0]
      guildData.save()
      //return success embed
      const opopo = new MessageEmbed()
      .setColor("#303037")
      .setDescription(`${emoji.msg.SUCCESS} Set new prefix to **\`${args[0]}\`**`)
      return message.channel.send({embeds: [opopo]});
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
      const choose = interaction.options.getString("prefix")
      //get the current prefix from the database
      let prefix = guildData.prefix;
      //if not in the database for some reason use the default prefix
      if (prefix === null) prefix = config.prefix;    
      if (choose.length > 5) {
        const ttt = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} The prefix can\'t be Longer then \`5\``)
        return interaction.reply({embeds: [ttt]})
      }
      //set the new prefix
      guildData.prefix = choose
      guildData.save()
      //return success embed
      const opopo = new MessageEmbed()
      .setColor("#303037")
      .setDescription(`${emoji.msg.SUCCESS} Set new prefix to **\`${choose}\`**`)
      return interaction.reply({embeds: [opopo]});
    } catch (e) {
      console.log(String(e.stack).bgRed)
      const emesdf = new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setAuthor(`An Error Occurred`)
      .setDescription(`\`\`\`${e.interaction}\`\`\``);
      return interaction.reply({embeds: [emesdf]});
    }
  }
};

