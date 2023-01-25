const Discord = require('discord.js')

module.exports = {
    name: "Resume",
    description: "Resume the song",
    async execute(message, args, client, track, interaction) {
        const queue = client.player.getQueue(message.guild.id);
        if (!message.member || !message.member.voice.channel) return message.reply('💡 Please connect to the voice channel first!')
        const paused = queue.setPaused(false);
          let pausedembed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setTitle("⏯️ Resume")
          .setDescription(`\`${queue.current.title}\` resuming!`)
          .addField("Requester", `${message.author}`, true)
            message.channel.send({ embeds: [pausedembed] })
    }
}