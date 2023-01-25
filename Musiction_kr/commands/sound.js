const Discord = require('discord.js')

module.exports = {
    name: "볼륨",
    description: "볼륨을 조절해요!",
    async execute(message, args, client) {
        const arg1 = args.join(' ')
        const queue = client.player.getQueue(message.guild.id);
        if (!message.member || !message.member.voice.channel) return message.reply({ content: '💡 먼저 음성채널에 접속해주세여!' })

        if (!queue || !queue.playing) return message.reply({ content: '💡 재생하고 있는 곡이 없어요!' })
    
        if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({ content: '💡 제가 있는 음성채널에 와주세요!' })    
        if ((arg1) < 0 || (arg1) > 300) return void message.reply({ content: "💡 볼륨은 0~300까지만 조절 할 수 있습니다" });
        const success = queue.setVolume(arg1);

        return message.channel.send({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor("AQUA")
                    .setTitle("🎧 볼륨 🎧")
                    .setDescription(`${arg1}%`)
                    .addField("요청자", `${message.author}`, true)
            ]
        })
    }
}