const Discord = require("discord.js")

module.exports = (client) => {
  client.on("guildMemberAdd", (member) => {
    let channel = member.guild.channels.cache;

    let embed = new Discord.MessageEmbed()
      .setThumbnail(
        "https://cdn.discordapp.com/icons/570351227062321153/a_d746216e00a3b945aef1411fc2877c6f.gif?size=128" // The thumbnail image for the welcome message
      )
      .addField(
        `:sparkles: Welcome!`,
        `Hello, welcome to ${member.guild.name} <@${member.user.id}>!`,
        true
      )
      .setColor("PURPLE")
      .setImage(
        "https://i.imgur.com/5znEqjl.gif" // The banner image for the welcome message
      );

    channel
      .find((channel) => channel.id === process.env.CHANNEL_ID)
      .send({ embeds: [embed] });
  });
}