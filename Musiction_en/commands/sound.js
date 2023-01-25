const Discord = require('discord.js')

module.exports = {
    name: "Volume",
    description: "Let's control the volume!",
    async execute(message, args, client) {
        const arg1 = args.join(' ')
        const queue = client.player.getQueue(message.guild.id);
        if (!message.member || !message.member.voice.channel) return message.reply({ content: '💡 Please connect to the voice channel first!' })

        if (!queue || !queue.playing) return message.reply({ content: '💡 There is no playing song' })
    
        if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({ content: '💡 Please come to my voice channel!' })    
        if ((arg1) < 0 || (arg1) > 300) return void message.reply({ content: "💡 You can adjust the volume from 0 to 300." });
        const success = queue.setVolume(arg1);

        return message.channel.send({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor("AQUA")
                    .setTitle("🎧 Volume 🎧")
                    .setDescription(`${arg1}%`)
                    .addField("Requester", `${message.author}`, true)
            ]
        })
    }
}