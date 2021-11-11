const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const DBL = require('@top-gg/sdk');
const emoji = require(`../../botconfig/emojis.json`);

module.exports = {
    name: `24/7`,
    aliases: [`247`, `autojoin`],
    perms: [`SEND_MESSAGES`],
    botperms: [`SEND_MESSAGES`, `EMBED_LINK`],
    category: `Settings`,
    description: `Enable 24/7 mode in your server`,
    usage: `24/7`,
    memberpermissions: [`ADMINISTRATOR`],
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

            const noprem = new MessageEmbed()
                .setColor("#303037")
                .setTitle(`${emoji.msg.prem} | Premium Only Command`)
                .setDescription(`This Is A Premium Only Command Dm Owner To Buy [ \[ Free For Now \] ](${config.links.server})`)
                .setFooter(ee.footertext, ee.footericon)

            const premiumGuildSchema = require("../../models/premium-guild")

            premiumGuildSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
                if (!data) {

                    message.reply({ embeds: [noprem] })

                } else {
                    const memchannel = message.member.voice.channel;
                    if (!memchannel) {
                        const eme = new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setDescription(`${emoji.msg.ERROR} You are not in voice channel`)
                        return message.channel.send({ embeds: [eme] })
                    }

                    guildData.ajenabled = !guildData.ajenabled
                    guildData.textChannel = guildData.ajenabled ? null : message.channel.id;
                    guildData.voiceChannel = guildData.ajenabled ? null : memchannel.id;
                    guildData.save()

                    const suc = new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`${guildData.ajenabled ? emoji.msg.SUCCESS : emoji.msg.ERROR} 24/7 Mode is now **${guildData.ajenabled ? `Enabled` : `Disabled`}**`)
                    message.channel.send({ embeds: [suc] })
                }
            })



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

            try {

            } catch {/** */ }

            const noprem = new MessageEmbed()
                .setColor("#303037")
                .setTitle(`${emoji.msg.prem} | Premium Only Command`)
                .setDescription(`This Is A Premium Only Command Dm Owner To Buy [ \[ Free For Now \] ](${config.links.server})`)
                .setFooter(ee.footertext, ee.footericon)

            const premiumGuildSchema = require("../../models/premium-guild")

            premiumGuildSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
                if (!data) {

                   interaction.reply({ embeds: [noprem] })

                } else {
                    const memchannel = interaction.member.voice.channel;
                    if (!memchannel) {
                        const eme = new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setDescription(`${emoji.msg.ERROR} You are not in voice channel`)
                        return interaction.reply({ embeds: [eme] })
                    }

                    guildData.ajenabled = !guildData.ajenabled
                    guildData.textChannel = guildData.ajenabled ? null : interaction.channel.id;
                    guildData.voiceChannel = guildData.ajenabled ? null : memchannel.id;
                    guildData.save()

                    const suc = new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`${guildData.ajenabled ? emoji.msg.SUCCESS : emoji.msg.ERROR} 24/7 Mode is now **${guildData.ajenabled ? `Enabled` : `Disabled`}**`)
                    interaction.reply({ embeds: [suc] })
                }
            })



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
