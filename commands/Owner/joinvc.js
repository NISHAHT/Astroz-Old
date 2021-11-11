const { MessageEmbed } = require(`discord.js`);
const Discord = require('discord.js')
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const { findOrCreateGuild } = require("../../handlers/functions");
const { getvc, gettc } = require('../../handlers/autojoin')
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: `joinvc`,
    category: `Owner`,
    aliases: [],
    description: `execute custom Command`,
    usage: `execute`,
    run: async (client, message, args, guildData, player, prefix) => {
        if (!config.ownerIDS.includes(message.author.id)) {
            const nope = new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setDescription(`${emoji.msg.ERROR} You are not allowed to run this command! Only the KenichiPlayZ is allowed to run this command`)
            return message.channel.send({ embeds: nope })
        }

        const guildids = client.guilds.cache.map((r) => r.id);
        guildids.forEach(async guildID => {
            const guildData = await findOrCreateGuild(client, { id: guildID })
            if (guildData) {
                const guild = client.guilds.cache.get(guildID)
                const vcid = await getvc(guildID)
                const vc = guild.channels.cache.get(vcid)
                if (!vc) return;
                const vcperm = vc.permissionsFor(client.user).has(Discord.Permissions.FLAGS.CONNECT)
                if (!vcperm) return;
                const tcid = await gettc(guildID)
                const tc = guild.channels.cache.get(tcid)
                if (!tc) return;
                const player = await client.manager.create({
                    guild: guildID,
                    voiceChannel: vcid,
                    textChannel: tcid,
                    selfDeafen: true
                });
                player.connect();
            }
        })
        const embed = new MessageEmbed()
            .setColor('DARK_RED')
            .setDescription("Reconnected All Voiec Channels!")
        message.reply({ embeds: [embed] })
    },
};