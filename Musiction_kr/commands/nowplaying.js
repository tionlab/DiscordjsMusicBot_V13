module.exports ={
    name: "현재곡",
    description: "지금 재생중인 노래를 확인해요!",
    async execute(message, args, client){
        const queue = client.player.getQueue(message.guild.id);
        if (!message.member || !message.member.voice.channel) return message.reply({ content: '💡 먼저 음성채널에 접속해주세여!' })

        if (!queue || !queue.playing) return message.reply({ content: '💡 재생하고 있는 곡이 없어요!' })

        if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({ content: '💡 제가 있는 음성채널에 와주세요!' })

        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();

        return void message.channel.send({
            embeds: [
                {
                    title: `지금은 이노래를 재생하고 있어요! \`${message.guild.me.voice.channel.name}\``,
                    description: `🎶 | **${queue.current.title}**! (\`${perc.progress}%\`)`,
                    fields: [
                        {
                            name: "\u200b",
                            value: progress
                        }
                    ],
                    color: 0xCC99FF
                }
            ]
        });
    }
}