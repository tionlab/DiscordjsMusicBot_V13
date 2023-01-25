const Discord = require('discord.js')
const { Permissions } = require('discord.js');

module.exports = {
    name: "Stop",
    description: "Stop the music",
    async execute(message, args, client, track) {
        const queue1 = client.player.getQueue(message.guild.id);
        if (!message.member.permissions.has(Permissions.ADMINISTRATOR)) return message.reply("💡 Only Admin can use this command")
        if (!queue1 || !queue1.playing) return message.reply({ content: '💡 There is no playing song' })
        if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({ content: '💡 Please come to my voice channel!' })
        if (queue1) queue1.destroy();
        message.channel.send({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle("Stop")
                    .setDescription("Stoped the music")
                    .addField("Requester", `${message.author}`, true)
                ]
            })
        }
    }