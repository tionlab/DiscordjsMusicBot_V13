const { QueryType } = require('discord-player')
const Discord = require('discord.js')
const yts = require('yt-search')

module.exports = {
  name: '재생',
  description: '노래를 재생해요!',
  async execute(message, args, client) {
    const query = args.join(' ')
    const r = await yts (args.join(' '))

    if (!args[0]) return message.reply('💡 음악 이름을 알려주세요!')

    if (!message.member || !message.member.voice.channel) return message.reply('💡 먼저 음성채널에 접속해주세여!')
    
    if (message.guild.me.voice.channel) {
      if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply('💡 그.. 이미 다른 채널에서 음악을 틀고있어요.. 제가 2명이 아니여서 못틀거같애요..')
    }

    const searchResult = await client.player.search(query, {
      requestedBy: message.author,
      searchEngine: QueryType.AUTO
    }).catch(() => {})

    if (!searchResult || !searchResult.tracks.length) return message.reply('💡 이상하네요.. 검색결과가 텅텅비어있어요.. ')

    const queue = await client.player.createQueue(message.guild, {
      metadata: message.channel
    })

    try {
      if (!queue.connection) await queue.connect(message.member.voice.channel)
    } catch (error) {
      console.log(error)
      client.player.deleteQueue(message.guild.id)
      return message.reply('권한이 없어서 그런지 음성채널에 접속이 안되네요...')
    }
      const videos = r.videos.slice( 0, 1 )
          videos.forEach( function ( v ) {
          const views = String( v.views ).padStart( 10, ' ' )
          let playembed = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setTitle("🎶 노래를 리스트에 추가할게요! 🎶")
                .setURL(`${v.url}`)
                .setDescription(`💡`+ `\`${ v.title }\`` + `(이)가 신청곡리스트에 추가되었습니다!`)
                .addField("길이", `${ v.timestamp }`, true)
                .addField("게시자", `${ v.author.name }`, true)
                .addField("조회수", `${views}`, true)
                .addField("요청자", `${message.author}`, true)
                .setThumbnail(`${v.image}`)
            message.channel.send({ embeds: [playembed] })
          })
    searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0])
    if (!queue.playing) await queue.play()
    }
}