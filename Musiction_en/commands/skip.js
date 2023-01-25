const Discord = require('discord.js')

module.exports = {
    name: "Skip",
    description: "Skip the song",
    async execute(message, args, client){
        const queue = client.player.getQueue(message.guild.id);    
        if (!message.member || !message.member.voice.channel) return message.reply({ content: '💡 Please connect to the voice channel first!' })

        if (!queue || !queue.playing) return message.reply({ content: '💡 There is no playing song' })
    
        if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({ content: '💡 Please come to my voice channel!' })    
        const currentTrack = queue.current;
        const success = queue.skip();

        return message.channel.send({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor("BLUE")
                    .setTitle("🔃 Skip")
                    .setDescription(`💡 \`${currentTrack}\` skipped!`)
                    .addField("Requester", `${message.author}`, true)
            ]
        });
    }
}