const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const DBL = require('@top-gg/sdk');
module.exports = {
  name: `join`,
  category: `Music`,
  aliases: [`j`],
  description: `Joins the Bot in your Channel`,
  usage: `join`,
  parameters: {"type":"radio", "activeplayer": false, "previoussong": false},
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


      var { channel } = message.member.voice;
      if(!channel) {
        const tot = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} You are not connected to a Voice Channel`)
        return message.channel.send({embeds: [tot]})
      }
      //if no args return error
      var player = client.manager.players.get(message.guild.id);
      if(player) {
        const mm = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} I am already connected somewhere`)
        return message.channel.send({embeds: [mm]});
      }
      //create the player
      player = client.manager.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
        selfDeafen: config.settings.selfDeaf,
      });
      //join the chanel
      if (player.state !== "CONNECTED") { 
        try {
          message.react(emoji.msg.SUCCESS)
        } catch {/* */}
        // join the channel
        player.connect();
        if(message.member.voice.channel.type === "stage") {
          setTimeout(async () => {
            try{ await message.guild.me.voice.setSuppressed(false) } catch {/* */}
          }, client.ws.ping);
        }
      }
      else {
        const oop = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} I am already connected somewhere`)
        return message.channel.send({embeds: [oop]});
      }
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
      var { channel } = interaction.member.voice;
      if(!channel) {
        const tot = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} You are not connected to a Voice Channel`)
        return interaction({embeds: [tot]})
      }
      //if no args return error
      var player = client.manager.players.get(message.guild.id);
      if(player) {
        const mm = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} I am already connected somewhere`)
        return interaction.reply({embeds: [mm]});
      }
      //create the player
      player = client.manager.create({
        guild: interaction.guild.id,
        voiceChannel: interaction.member.voice.channel.id,
        textChannel: interaction.channel.id,
        selfDeafen: config.settings.selfDeaf,
      });
      //join the chanel
      if (player.state !== "CONNECTED") { 
        try {
          interaction.reply({ content: 'done'})
        } catch {/* */}
        // join the channel
        player.connect();
        if(interaction.member.voice.channel.type === "stage") {
          setTimeout(async () => {
            try{ await interaction.guild.me.voice.setSuppressed(false) } catch {/* */}
          }, client.ws.ping);
        }
      }
      else {
        const oop = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} I am already connected somewhere`)
        return interaction.reply({embeds: [oop]});
      }
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
