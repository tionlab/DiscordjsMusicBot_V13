module.exports = {
    name: "list",
    description: "Let me tell you the requested songs!",
    async execute(message, args, client) {
        const queue = client.player.getQueue(message.guild.id);
        if (!message.member || !message.member.voice.channel) return message.reply({ content: '💡 Please connect to the voice channel first!' })

        if (!queue || !queue.playing) return message.reply({ content: '💡 There is no playing song' })

        if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({ content: '💡 Please come to my voice channel!' })

        const currentTrack = queue.current;
        const tracks = queue.tracks.slice(0, 10).map((m, i) => {
            return `${i + 1}. **${m.title}** ([link](${m.url}))`;
        });

        return void message.channel.send({
            embeds: [
                {
                    title: `It's a song request list! \`${message.guild.me.voice.channel.name}\``,
                    description: `${tracks.join("\n")}${
                        queue.tracks.length > tracks.length
                            ? `\n...${queue.tracks.length - tracks.length === 1 ? `${queue.tracks.length - tracks.length} more songs.` : `${queue.tracks.length - tracks.length} more songs.`}`
                            : ""
                    }`,
                    color: 0x7f0fff,
                    fields: [{ name: "I'm playing this song now!", value: `🎶 | **${currentTrack.title}** (${currentTrack.url})` }]
                }
            ]
        });
    }
}