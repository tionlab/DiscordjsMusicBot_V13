const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'Repeat',
  description: 'Repeat the song.',
  async execute(message, args, client) {
    const queue = client.player.getQueue(message.guild.id)
    if (!message.member || !message.member.voice.channel) return message.reply({ content: '💡 Please connect to the voice channel first!' })

    if (!queue || !queue.playing) return message.reply({ content: '💡 There is no playing song' })

    if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({ content: '💡 Please come to my voice channel!' })

    if (args[0] == 'On' || args[0] == 'on') {
      queue.setRepeatMode(1)

      const embed = new MessageEmbed()
      .setColor('GREEN')
      .setTitle('🔁 Repeat')
      .setDescription(`💡 Repeat Activation`)
      .addField("Requester", `${message.author}`, true)

      message.channel.send({ embeds: [embed] })
    } else if (args[0] == 'Off' || args[0] == 'off') {
      queue.setRepeatMode(2)

      const embed = new MessageEmbed()
      .setColor('RED')
      .setTitle('🔁 Repeat 🔁')
      .setDescription(`💡 Repeat Deactivation`)
      .addField("Requester", `${message.author}`, true)

      message.channel.send({ embeds: [embed] })
    } else {
      return message.reply({ content: '💡 Huh? What did you write on the back? (Write on or off at the back.)' })
    }
  }
}