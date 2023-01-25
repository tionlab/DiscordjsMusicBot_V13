const Discord = require('discord.js')

module.exports = {
    name: "Pause",
    description: "Pause the song",
    async execute(message, args, client, track, interaction) {
        const queue = client.player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.reply("💡 I'm not playing any songs right now.");
        if (!message.member || !message.member.voice.channel) return message.reply('💡 Please connect to the voice channel first!')
        const paused = queue.setPaused(true);
          let pausedembed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setTitle("⏸️ Pause ⏸️")
          .setDescription(`📣 \`${queue.current.title}\` Paused!`)
          .addField("Requester", `${message.author}`, true)
            message.channel.send({ embeds: [pausedembed] })
    }
}