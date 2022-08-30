
const Discord = require("discord.js")

module.exports = (client) => {
  client.on('messageDelete', message => {
    const embed = new MessageEmbed()
      .setAuthor(`${message.author.username} (${message.author.id})`, message.author.avatarURL())
      .setDescription(message.content)

    const channel = VERIFY_CHANNEL_ID
    channel.send(embed)
  }) // Log deleted message
}