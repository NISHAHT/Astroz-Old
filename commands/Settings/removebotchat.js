const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: `removebotchat`,
  aliases: [`removebotchat`, `settextchannel`, `stc`],
  category: `Settings`,
  description: `Let's you delete the channel for the bot commands`,
  usage: `removebotchat`,
  memberpermissions: [`ADMINISTRATOR`],
  options: [
    {
      name: 'channel',
      description: 'Select Channel To Make Bot Chat!',
      required: true,
      type: 'CHANNEL'
    }
  ],
  run: async (client, message, args, guildData, player, prefix) => {
    try {
      //get the mentioned channel
      let channel = message.mentions.channels.first();
      if (!channel) {
        const idk = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} Please add a Channel via ping, for example: <#${message.channel.id}>!`)
        return message.channel.send({embeds: [idk]})
      }
      //try to find it, just incase user pings channel from different server
      try {
        message.guild.channels.cache.get(channel.id)
      } catch {
        const ooy = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} It seems that the Channel does not exist in this Server!`)
        return message.channel.send({embeds: [ooy]});
      }
      //if its not in the database return error
      if (!guildData.botChannels.includes(channel.id)) {
        const yoyo = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} This Channel is not in the Bot Channel Settings!`)
        return message.channel.send({embeds: [yoyo]})
      }
      //remove the Channel from the Database
      guildData.botChannels = guildData.botChannels.filter((ch) => ch !== channel.id)
      guildData.save()
      //these lines creates the string for all botchannels
      let leftb = ``;
      if (guildData.botChannels.join(``) === ``) leftb = `No Channels   `
      else
        for (let i = 0; i < guildData.botChannels.length; i++) {
          leftb += `<#` + guildData.botChannels[i] + `> | `
        }
      //send informational message
      const opppooo = new MessageEmbed()
      .setColor("#303037")
      .setDescription(`${emoji.msg.SUCCESS} Removed the Bot-Chat \`${channel.name}\`\n> ${guildData.botChannels.length > 0 ? guildData.botChannels.map((dj) => `<#${dj}>`).join(" | ") : `No Bot Chats`}`)
      return message.channel.send({embeds: [opppooo]});
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
      //get the mentioned channel
      let channel = interaction.options.getChannel("channel")
      if (!channel) {
        const idk = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} Please add a Channel via ping, for example: <#${interaction.channel.id}>!`)
        return interaction.reply({embeds: [idk]})
      }
      //try to find it, just incase user pings channel from different server
      try {
        interaction.guild.channels.cache.get(channel.id)
      } catch {
        const ooy = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} It seems that the Channel does not exist in this Server!`)
        return interaction.reply({embeds: [ooy]});
      }
      //if its not in the database return error
      if (!guildData.botChannels.includes(channel.id)) {
        const yoyo = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} This Channel is not in the Bot Channel Settings!`)
        return interaction.reply({embeds: [yoyo]})
      }
      //remove the Channel from the Database
      guildData.botChannels = guildData.botChannels.filter((ch) => ch !== channel.id)
      guildData.save()
      //these lines creates the string for all botchannels
      let leftb = ``;
      if (guildData.botChannels.join(``) === ``) leftb = `No Channels   `
      else
        for (let i = 0; i < guildData.botChannels.length; i++) {
          leftb += `<#` + guildData.botChannels[i] + `> | `
        }
      //send informational message
      const opppooo = new MessageEmbed()
      .setColor("#303037")
      .setDescription(`${emoji.msg.SUCCESS} Removed the Bot-Chat \`${channel.name}\`\n> ${guildData.botChannels.length > 0 ? guildData.botChannels.map((dj) => `<#${dj}>`).join(" | ") : `No Bot Chats`}`)
      return interaction.reply({embeds: [opppooo]});
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

