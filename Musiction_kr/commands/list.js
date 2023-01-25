module.exports = {
    name: "목록",
    description: "신청된 곡들을 알려드려요! ",
    async execute(message, args, client) {
        const queue = client.player.getQueue(message.guild.id);
        if (!message.member || !message.member.voice.channel) return message.reply({ content: '💡 먼저 음성채널에 접속해주세여!' })

        if (!queue || !queue.playing) return message.reply({ content: '💡 재생하고 있는 곡이 없어요!' })

        if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({ content: '💡 제가 있는 음성채널에 와주세요!' })

        const currentTrack = queue.current;
        const tracks = queue.tracks.slice(0, 10).map((m, i) => {
            return `${i + 1}. **${m.title}** ([link](${m.url}))`;
        });

        return void message.channel.send({
            embeds: [
                {
                    title: `신청곡 리스트에요! \`${message.guild.me.voice.channel.name}\``,
                    description: `${tracks.join("\n")}${
                        queue.tracks.length > tracks.length
                            ? `\n...${queue.tracks.length - tracks.length === 1 ? `${queue.tracks.length - tracks.length} 개의 곡이 더있습니다.` : `${queue.tracks.length - tracks.length} 개의 곡들이 더있습니다.`}`
                            : ""
                    }`,
                    color: 0x7f0fff,
                    fields: [{ name: "지금은 이노래를 재생중이에요!", value: `🎶 | **${currentTrack.title}** (${currentTrack.url})` }]
                }
            ]
        });
    }
}