const Discord = require('discord.js')

module.exports = {
    name: "스킵",
    description: "노래를 스킵해요!",
    async execute(message, args, client){
        const queue = client.player.getQueue(message.guild.id);    
        if (!message.member || !message.member.voice.channel) return message.reply({ content: '💡 먼저 음성채널에 접속해주세여!' })

        if (!queue || !queue.playing) return message.reply({ content: '💡 재생하고 있는 곡이 없어요!' })
    
        if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({ content: '💡 제가 있는 음성채널에 와주세요!' })    
        const currentTrack = queue.current;
        const success = queue.skip();

        return message.channel.send({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor("BLUE")
                    .setTitle("🔃 스킵")
                    .setDescription(`💡 \`${currentTrack}\` (을)를 건너뛰었어요!`)
                    .addField("요청자", `${message.author}`, true)
            ]
        });
    }
}