const Discord = require('discord.js')

module.exports = {
    name: "일시정지",
    description: "노래를 일시정지해요!",
    async execute(message, args, client, track, interaction) {
        const queue = client.player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.reply('💡 지금은 아무곡도 재생중이지 않아요..');
        if (!message.member || !message.member.voice.channel) return message.reply('💡 먼저 음성채널에 접속해주세여!')
        const paused = queue.setPaused(true);
          let pausedembed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setTitle("⏸️ 일시정지 ⏸️")
          .setDescription(`📣 \`${queue.current.title}\`(이)가 일시정지 되었어요!`)
          .addField("요청자", `${message.author}`, true)
            message.channel.send({ embeds: [pausedembed] })
    }
}