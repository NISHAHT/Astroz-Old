const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: `cmdreload`,
  category: `Owner`,
  aliases: [`reload`],
  description: `Reloads a command  [Owner Only]`,
  usage: `cmdreload <CMD>`,
  options: [
    {
      name: 'command',
      description: 'Provide Command For Reload [ Owner Only ]!',
      required: true,
      type: 'STRING'
    }
  ],
  run: async (client, message, args, guildData, player, prefix) => {
    if (!config.ownerIDS.includes(message.author.id)) {
      const nop = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} You are not allowed to run this command! Only Developers is allowed to run this command`)
      return message.channel.send({ embeds: [nop] })
    }
    try {
      
      let reload = false;
      for (let i = 0; i < client.categories.length; i += 1) {
        let dir = client.categories[i];
        try {  
          delete require.cache[require.resolve(`../../commands/${dir}/${choose}.js`)] // usage !reload <name>
          client.commands.delete(choose)
          const pull = require(`../../commands/${dir}/${choose}.js`)
          client.commands.set(choose, pull)
          reload = true;
        } catch { }
      }
      if (reload) {
        const op = new MessageEmbed()
          .setColor(ee.color)
          .setDescription(`${emoji.msg.SUCCESS} Reloaded \`${choose}\``)
        return message.channel.send({ embeds: [op] })
      }
      const notop = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} Could not reload: \`${choose}\``)
      return message.channel.send({ embeds: [notop] });
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
    if (!config.ownerIDS.includes(interaction.member.id)) {
      const nop = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} You are not allowed to run this command! Only Developers is allowed to run this command`)
      return interaction.reply({ embeds: [nop] })
    }
    try {
      const choose = interaction.options.getString("command")
      let reload = false;
      for (let i = 0; i < client.categories.length; i += 1) {
        let dir = client.categories[i];
        try {
          delete require.cache[require.resolve(`../../commands/${dir}/${choose}.js`)] // usage !reload <name>
          client.commands.delete(choose)
          const pull = require(`../../commands/${dir}/${choose}.js`)
          client.commands.set(choose, pull)
          reload = true;
        } catch { }
      }
      if (reload) {
        const op = new MessageEmbed()
          .setColor(ee.color)
          .setDescription(`${emoji.msg.SUCCESS} Reloaded \`${choose}\``)
        return interaction.reply({ embeds: [op] })
      }
      const notop = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} Could not reload: \`${choose}\``)
      return interaction.reply({ embeds: [notop] });
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