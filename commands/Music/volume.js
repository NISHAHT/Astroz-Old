const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const DBL = require('@top-gg/sdk');
module.exports = {
    name: `volume`,
    category: `Music`,
    aliases: [`vol`],
    description: `Changes the Volume`,
    usage: `volume <0-150>`,
    parameters: {"type":"music", "activeplayer": true, "previoussong": false},
    options: [
        {
          name: 'volume',
          description: 'Provide Volume!',
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
        
            //if the Volume Number is out of Range return error msg
            if (Number(args[0]) <= 0 || Number(args[0]) > 150) {
                const ypy = new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setDescription(`${emoji.msg.SUCCESS} Current volume is \`${player.volume} %\``)
                message.channel.send({ embeds: [ypy] }).then(msg => {
                    setTimeout(() => {
                        try {
                            msg.delete().catch((err) => {
                                return
                            })
                        } catch(err) {
                            return
                        }
                    }, 9000)
                })
                return
            }
            //if its not a Number return error msg
            if (isNaN(args[0])) {
                const poopp = new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setDescription(`${emoji.msg.SUCCESS} Current volume is \`${player.volume} %\``)
                message.channel.send({ embeds: [poopp] }).then(msg => {
                    setTimeout(() => {
                        try {
                            msg.delete().catch((err) => {
                                return
                            })
                        } catch(err) {
                            return
                        }
                    }, 9000)
                })
                return
            }

            const { channel } = message.member.voice;

            if (!channel) {
                const opop = new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setDescription(`${emoji.msg.ERROR} You need to join a voice channel.`)
                message.channel.send({ embeds: [opop] }).then(msg => {
                    setTimeout(() => {
                        try {
                            msg.delete().catch((err) => {
                                return
                            })
                        } catch(err) {
                            return
                        }
                    }, 9000)
                })
                return
            }

            if (!player.queue.current) {
                const no = new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setDescription(`${emoji.msg.ERROR} There is nothing playing`)
                message.channel.send({ embeds: [no] }).then(msg => {
                    setTimeout(() => {
                        try {
                            msg.delete().catch((err) => {
                                return
                            })
                        } catch(err) {
                            return
                        }
                    }, 9000)
                })
                return
            }

            //change the volume
            player.setVolume(Number(args[0]));
            //send success message
            const yto = new MessageEmbed()
            .setDescription(`${emoji.msg.raise_volume} Volume set to: \`${player.volume} %\``)
            .setColor(ee.color)
            message.channel.send({ embeds: [yto] }).then(msg => {
                setTimeout(() => {
                    try {
                        msg.delete().catch((err) => {
                            return
                        })
                    } catch(err) {
                        return
                    }
                }, 9000)
            })
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
        const choose = interaction.options.get('volume');
        try {
            

            //if the Volume Number is out of Range return error msg
            if (Number(choose.value) <= 0 || Number(choose.value) > 150) {
                const ypy = new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setDescription(`${emoji.msg.SUCCESS} Current volume is \`${player.volume} %\``)
                return interaction.reply({embeds: [ypy]})
            }
            //if its not a Number return error msg
            if (isNaN(choose.value)) {
                const poopp = new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setDescription(`${emoji.msg.SUCCESS} Current volume is \`${player.volume} %\``)
                return interaction.reply({embeds: [poopp]})
            }

            const { channel } = interaction.member.voice;

            if (!channel) {
                const opop = new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setDescription(`${emoji.msg.ERROR} You need to join a voice channel.`)
                return interaction.reply({ embeds: [opop] });
            }

            if (!player.queue.current) {
                const no = new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setDescription(`${emoji.msg.ERROR} There is nothing playing`)
                return interaction.reply({embeds: [no]})
            }

            //change the volume
            player.setVolume(Number(choose.value));
            //send success message
            const yto = new MessageEmbed()
            .setDescription(`${emoji.msg.raise_volume} Volume set to: \`${player.volume} %\``)
            .setColor(ee.color)
            return interaction.reply({embeds: [yto]});
        } catch (e) {
            console.log(String(e.stack).bgRed)
            const emesdf = new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setAuthor(`An Error Occurred`)
            .setDescription(`\`\`\`${e.message}\`\`\``);
            return interaction.reply({embeds: [emesdf]});
        }
    },
};