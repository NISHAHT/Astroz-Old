const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require("../../botconfig/emojis.json");
const DBL = require('@top-gg/sdk');
module.exports = {
  name: "settings",
  category: "Settings",
  aliases: ["musicsettings"],
  cooldown: 10,
  usage: "settings",
  description: "Shows you the current settings, like Premium, which commands are on DJ ONLY, the DJ ROLES and BOT CHANNELS ....",
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
      //these lines creates the string for all botchannels
      const embed = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setColor("#303037")
        .setFooter(ee.footertext, ee.footericon);

      // Guild prefix
      embed.addField("Server Prefix", `\`${prefix}\``, true);

      // DJJRoles
      embed.addField(`${emoji.msg.dj} DJ Role(s)`,
        (guildData.djRoles.length > 0) ? guildData.djRoles.map((ch) => `<@&${ch}>`).join(" | ") : "`No Dj Roles`", true);


      embed.addField(`${emoji.msg.bot} Bot Channel(s)`,
        (guildData.botChannels.length > 0) ? guildData.botChannels.map((ch) => `<#${ch}>`).join(" | ") : "`No Channels`", true);

      embed.addField(`🗑️ Pruning`, guildData.pruning ? `${emoji.msg.SUCCESS} \`Enabled\`` : `${emoji.msg.ERROR} \`Disabled\``, true);
      try {
        embed.addField(`🔔 Now playing messages`, guildData.announce ? `${emoji.msg.SUCCESS} \`Enabled\`` : `${emoji.msg.ERROR} \`Disabled\``, true);
      } catch {/* */ }
      // DJOnly Commands
      let leftdj = "";
      if (guildData.djonlycmds.sort(function (a, b) {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      }).join("") === "") leftdj = "`No DJonlyCommands`"
      else
        for (let i = 0; i < guildData.djonlycmds.length; i++) {
          leftdj += "`" + guildData.djonlycmds[i] + "` | "
        }
      embed.addField(`${emoji.msg.dj} DJ Commands`, `\`\`\`${guildData.djonlycmds.join(", ")}\`\`\``);
      embed.addField(`${emoji.msg.prem} Premium Only Commands`, `\`\`\`24/7, toggle-pruning\`\`\``);


      // send embed
      message.channel.send({ embeds: [embed] });
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
      //these lines creates the string for all botchannels
      const embed = new MessageEmbed()
        .setAuthor(interaction.guild.name, interaction.guild.iconURL())
        .setColor("#303037")
        .setFooter(ee.footertext, ee.footericon);

      // Guild prefix
      embed.addField("Server Prefix", `\`${prefix}\``, true);

      // DJJRoles
      embed.addField(`${emoji.msg.dj} DJ Role(s)`,
        (guildData.djRoles.length > 0) ? guildData.djRoles.map((ch) => `<@&${ch}>`).join(" | ") : "`No Dj Roles`", true);


      embed.addField(`${emoji.msg.bot} Bot Channel(s)`,
        (guildData.botChannels.length > 0) ? guildData.botChannels.map((ch) => `<#${ch}>`).join(" | ") : "`No Channels`", true);

      embed.addField(`🗑️ Pruning`, guildData.pruning ? `${emoji.msg.SUCCESS} \`Enabled\`` : `${emoji.msg.ERROR} \`Disabled\``, true);
      try {
        embed.addField(`🔔 Now playing messages`, guildData.announce ? `${emoji.msg.SUCCESS} \`Enabled\`` : `${emoji.msg.ERROR} \`Disabled\``, true);
      } catch {/* */ }
      // DJOnly Commands
      let leftdj = "";
      if (guildData.djonlycmds.sort(function (a, b) {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      }).join("") === "") leftdj = "`No DJonlyCommands`"
      else
        for (let i = 0; i < guildData.djonlycmds.length; i++) {
          leftdj += "`" + guildData.djonlycmds[i] + "` | "
        }
      embed.addField(`${emoji.msg.dj} DJ Commands`, `\`\`\`${guildData.djonlycmds.join(", ")}\`\`\``);
      embed.addField(`${emoji.msg.prem} Premium Only Commands`, `\`\`\`24/7, toggle-pruning\`\`\``);


      // send embed
      interaction.reply({ embeds: [embed] });
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

