const { MessageEmbed } = require('discord.js')

module.exports = {
  name: '반복',
  description: '노래를 반복재생해요.',
  async execute(message, args, client) {
    const queue = client.player.getQueue(message.guild.id)
    if (!message.member || !message.member.voice.channel) return message.reply({ content: '💡 먼저 음성채널에 접속해주세여!' })

    if (!queue || !queue.playing) return message.reply({ content: '💡 재생하고 있는 곡이 없어요!' })

    if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({ content: '💡 제가 있는 음성채널에 와주세요!' })

    if (args[0] == '켜기' || args[0] == 'ㅋㄱ') {
      queue.setRepeatMode(1)

      const embed = new MessageEmbed()
      .setColor('GREEN')
      .setTitle('🔁 반복재생')
      .setDescription(`💡 반복재생 모드가 활성화 되었어요`)
      .addField("요청자", `${message.author}`, true)

      message.channel.send({ embeds: [embed] })
    } else if (args[0] == '끄기' || args[0] == 'ㄲㄱ') {
      queue.setRepeatMode(2)

      const embed = new MessageEmbed()
      .setColor('RED')
      .setTitle('🔁 반복재생 🔁')
      .setDescription(`💡 반복재생 모드가 비활성화 되었어요`)
      .addField("요청자", `${message.author}`, true)

      message.channel.send({ embeds: [embed] })
    } else {
      return message.reply({ content: '💡 에? 뒤에 뭐라고 적어주신거에여? (켜기 혹은 끄기를 뒤에 적어주세요)' })
    }
  }
}