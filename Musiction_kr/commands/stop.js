const Discord = require('discord.js')
const { Permissions } = require('discord.js');

module.exports = {
    name: "정지",
    description: "노래를 정지해요.",
    async execute(message, args, client, track) {
        const queue1 = client.player.getQueue(message.guild.id);
        if (!message.member.permissions.has(Permissions.ADMINISTRATOR)) return message.reply("💡 해당 명령은 서버관리자만 사용할수있어요!")
        if (!queue1 || !queue1.playing) return message.reply({ content: '💡 재생하고 있는 곡이 없어요!' })
        if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({ content: '💡 제가 있는 음성채널에 와주세요!' })
        if (queue1) queue1.destroy();
        message.channel.send({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle("정지")
                    .setDescription("노래를 정지했어요!")
                    .addField("요청자", `${message.author}`, true)
                ]
            })
        }
    }