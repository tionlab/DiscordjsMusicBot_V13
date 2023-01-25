module.exports ={
    name: "Current",
    description: "Current song",
    async execute(message, args, client){
        const queue = client.player.getQueue(message.guild.id);
        if (!message.member || !message.member.voice.channel) return message.reply({ content: '💡 Please connect to the voice channel first!' })

        if (!queue || !queue.playing) return message.reply({ content: '💡 There is no playing song' })

        if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({ content: '💡 Please come to my voice channel!' })

        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();

        return void message.channel.send({
            embeds: [
                {
                    title: `I'm playing this song now! \`${message.guild.me.voice.channel.name}\``,
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