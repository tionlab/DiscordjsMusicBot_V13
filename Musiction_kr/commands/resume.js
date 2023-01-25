const Discord = require('discord.js')

module.exports = {
    name: "재개",
    description: "노래를 재개해요!",
    async execute(message, args, client, track, interaction) {
        const queue = client.player.getQueue(message.guild.id);
        if (!message.member || !message.member.voice.channel) return message.reply('💡 먼저 음성채널에 접속해주세여!')
        const paused = queue.setPaused(false);
          let pausedembed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setTitle("⏯️ 재개")
          .setDescription(`\`${queue.current.title}\`(이)가 재개 되고 있어요!`)
          .addField("요청자", `${message.author}`, true)
            message.channel.send({ embeds: [pausedembed] })
    }
}