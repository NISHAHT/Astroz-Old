const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const DBL = require('@top-gg/sdk');
const emoji = require(`../../botconfig/emojis.json`);
const savePlaylist = require("../../models/Playlists");

module.exports = {
  name: `pl-create`,
  category: `CustomPlaylist`,
  aliases: [`plcreate`, `pl-save`, `plsave`],
  description: `Saves the Current Queue onto a Name`,
  usage: `pl-create <playlist name>`,
  options: [
    {
      name: 'name',
      description: 'Provide Name To Make Playlist!',
      required: true,
      type: 'STRING'
    }
  ],

  run: async (client, message, args, guildData, player, prefix, userData) => {

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
      const Name = args[0]
      if (!Name) {
        const eod = new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(`${emoji.msg.ERROR} You didn't entered a playlist name\nUsage: \`${prefix}pl-create <playlist name>\`\nName Information:\n\`Can be anything with maximum of 10 Letters\``)
        return message.channel.send({ embeds: [eod] });
      }
      if (Name.length > 10) {
        const isk = new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(`${emoji.msg.ERROR} Your playlist name is too long!\nMaximum Length is \`10\``)
        return message.channel.send({ embeds: [isk] });
      }
      let pNameFinder = await savePlaylist.find({
        userID: message.author.id,
        playlistName: Name
      });
      if (pNameFinder.length > 0) {
        const eere = new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(`${emoji.msg.ERROR} Your Queue already exists!\nDelete it: \`${prefix}pl-create delete ${Name}\`\nShow its content: \`${prefix}pl-info showdetails ${Name}`)
        return message.channel.send({ embeds: [eere] });
      }

      let fetchList = await savePlaylist.find({
        userID: message.author.id
      });
      if (fetchList.length >= 10) {
        const limit = new MessageEmbed()
          .setColor("RED")
          .setDescription(`${emoji.msg.ERROR} You are only allowed to save **10** playlists`)
        return message.channel.send({ embeds: [limit] });
      }

      var player = client.manager.players.get(message.guild.id);
      if (!player || !player.queue.current) {
        const de = new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(`${emoji.msg.ERROR} There is nothing playing`)
        return message.channel.send({ embeds: [de] })
      }
      if (!player.queue.current) {
        const dew = new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(`${emoji.msg.ERROR} There is nothing playing`)
        return message.channel.send({ embeds: [dew] });
      }

      //get all tracks
      const tracks = player.queue;

      //get the old tracks from the Name
      let oldtracks = pNameFinder.playlistArray
      if (!Array.isArray(oldtracks)) oldtracks = [];
      const newtracks = [];

      if (player.queue.current) {
        newtracks.push({
          "title": player.queue.current.title,
          "author": player.queue.current.author,
          "duration": player.queue.current.duration
        });
      }
      for (const track of tracks)
        newtracks.push({
          "title": track.title,
          "author": track.author,
          "duration": track.duration
        });
      //define the new customqueue by adding the newtracks to the old tracks
      let newqueue = oldtracks.concat(newtracks)

      const data = new savePlaylist({
        username: message.author.tag,
        userID: message.author.id,
        playlistName: Name,
        playlistArray: newqueue
      });

      data.save((err) => {
        if (err) console.error(err);
      });

      const tracklength = tracks.length + 1

      //return susccess message
      const idkd = new MessageEmbed()
        .setDescription(`${emoji.msg.SUCCESS} Created **${Name}** and Added **${tracklength}** Tracks to it\n\nPlay it with: \`${prefix}pl-load ${Name}\`\nAdd the current **Queue** onto it: \`${prefix}pl-addqueue ${Name}\`\nAdd the current **Track** onto it: \`${prefix}pl-addcurrentt ${Name}\``)
        .setColor(ee.color)
      return message.channel.send({ embeds: [idkd] })

    } catch (e) {
      console.log(String(e.stack).bgRed)
      const emesdf = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setAuthor(`An Error Occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``);
      return message.channel.send({ embeds: [emesdf] })
    }
  },
  runslash: async (client, interaction, guildData, player, prefix) => {
    const choose = interaction.options.getString('name')
    try {
      const Name = choose
      if (!Name) {
        const eod = new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(`${emoji.msg.ERROR} You didn't entered a playlist name\nUsage: \`${prefix}pl-create <playlist name>\`\nName Information:\n\`Can be anything with maximum of 10 Letters\``)
        return interaction.reply({ embeds: [eod] });
      }
      if (Name.length > 10) {
        const isk = new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(`${emoji.msg.ERROR} Your playlist name is too long!\nMaximum Length is \`10\``)
        return interaction.reply({ embeds: [isk] });
      }
      let pNameFinder = await savePlaylist.find({
        userID: interaction.author.id,
        playlistName: Name
      });
      if (pNameFinder.length > 0) {
        const eere = new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(`${emoji.msg.ERROR} Your Queue already exists!\nDelete it: \`${prefix}pl-create delete ${Name}\`\nShow its content: \`${prefix}pl-info showdetails ${Name}`)
        return interaction.reply({ embeds: [eere] });
      }

      let fetchList = await savePlaylist.find({
        userID: interaction.member.id
      });
      if (fetchList.length >= 10) {
        const limit = new MessageEmbed()
          .setColor("RED")
          .setDescription(`${emoji.msg.ERROR} You are only allowed to save **10** playlists`)
        return interaction.reply({ embeds: [limit] });
      }

      var player = client.manager.players.get(interaction.guild.id);
      if (!player || !player.queue.current) {
        const de = new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(`${emoji.msg.ERROR} There is nothing playing`)
        return interaction.reply({ embeds: [de] })
      }
      if (!player.queue.current) {
        const dew = new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(`${emoji.msg.ERROR} There is nothing playing`)
        return interaction.reply({ embeds: [dew] });
      }

      //get all tracks
      const tracks = player.queue;

      //get the old tracks from the Name
      let oldtracks = pNameFinder.playlistArray
      if (!Array.isArray(oldtracks)) oldtracks = [];
      const newtracks = [];

      if (player.queue.current) {
        newtracks.push({
          "title": player.queue.current.title,
          "author": player.queue.current.author,
          "duration": player.queue.current.duration
        });
      }
      for (const track of tracks)
        newtracks.push({
          "title": track.title,
          "author": track.author,
          "duration": track.duration
        });
      //define the new customqueue by adding the newtracks to the old tracks
      let newqueue = oldtracks.concat(newtracks)

      const data = new savePlaylist({
        username: interaction.member.tag,
        userID: interaction.member.id,
        playlistName: Name,
        playlistArray: newqueue
      });

      data.save((err) => {
        if (err) console.error(err);
      });

      const tracklength = tracks.length + 1

      //return susccess message
      const idkd = new MessageEmbed()
        .setDescription(`${emoji.msg.SUCCESS} Created **${Name}** and Added **${tracklength}** Tracks to it\n\nPlay it with: \`${prefix}pl-load ${Name}\`\nAdd the current **Queue** onto it: \`${prefix}pl-addqueue ${Name}\`\nAdd the current **Track** onto it: \`${prefix}pl-addcurrentt ${Name}\``)
        .setColor(ee.color)
      return interaction.reply({ embeds: [idkd] })

    } catch (e) {
      console.log(String(e.stack).bgRed)
      const emesdf = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setAuthor(`An Error Occurred`)
        .setDescription(`\`\`\`${e.interaction}\`\`\``);
      return interaction.reply({ embeds: [emesdf] })
    }
  },
};