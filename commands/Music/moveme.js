const {
  MessageEmbed
} = require(`discord.js`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: `moveme`,
  category: `Music`,
  aliases: [ ],
  description: `Moves you to the BOT, if playing something`,
  usage: `move`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false, "notsamechannel": true},
  run: async (client, message, args, guildData, player, prefix) => {
    try{
      let channel = message.member.voice.channel;
      let botchannel = message.guild.me.voice.channel;
      if(!botchannel) {
        const ifkf = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} I am connected nowhere`)
        return message.channel.send({embeds: [ifkf]})
      }
      if(!channel) {
        const dd = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} Please Connect first`)
        return message.channel.send({embeds: [dd]})
      }
      if(botchannel.userLimit >= botchannel.members.length) {
        const idkd = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} Channel is full, I cant move you`)
        return message.channel.send({embeds: [idkd]})
      }
      if(botchannel.id == channel.id) {
        const tt = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} You are already in my channel `)
        return message.channel.send({embeds: [tt]})
      }
      message.member.voice.setChannel(botchannel);
      const ioop = new MessageEmbed()
      .setColor("#2F3136")
      .setDescription(`${emoji.msg.SUCCESS} moved you to: \`${botchannel.name}\``)
      return message.channel.send({embeds: [ioop]});
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
      let channel = interaction.member.voice.channel;
      let botchannel = interaction.guild.me.voice.channel;
      if(!botchannel) {
        const ifkf = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} I am connected nowhere`)
        return interaction.reply({embeds: [ifkf]})
      }
      if(!channel) {
        const dd = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} Please Connect first`)
        return interaction.reply({embeds: [dd]})
      }
      if(botchannel.userLimit >= botchannel.members.length) {
        const idkd = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} Channel is full, I cant move you`)
        return interaction.reply({embeds: [idkd]})
      }
      if(botchannel.id == channel.id) {
        const tt = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} You are already in my channel `)
        return interaction.reply({embeds: [tt]})
      }
      interaction.member.voice.setChannel(botchannel);
      const ioop = new MessageEmbed()
      .setColor("#2F3136")
      .setDescription(`${emoji.msg.SUCCESS} moved you to: \`${botchannel.name}\``)
      return interaction.reply({embeds: [ioop]});
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