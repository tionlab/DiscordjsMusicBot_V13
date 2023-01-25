const { QueryType } = require('discord-player')
const Discord = require('discord.js')
const yts = require('yt-search')

module.exports = {
  name: 'Play',
  description: 'Play the song',
  async execute(message, args, client) {
    const query = args.join(' ')
    const r = await yts (args.join(' '))

    if (!args[0]) return message.reply('💡 Tell me the name of the music!')

    if (!message.member || !message.member.voice.channel) return message.reply('💡 Please connect to the voice channel first!')
    
    if (message.guild.me.voice.channel) {
      if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply("💡 I'm already playing music on another channel. I don't think I can play it because I'm not two")
    }

    const searchResult = await client.player.search(query, {
      requestedBy: message.author,
      searchEngine: QueryType.AUTO
    }).catch(() => {})

    if (!searchResult || !searchResult.tracks.length) return message.reply("💡 That's weird. The search results are empty. ")

    const queue = await client.player.createQueue(message.guild, {
      metadata: message.channel
    })

    try {
      if (!queue.connection) await queue.connect(message.member.voice.channel)
    } catch (error) {
      console.log(error)
      client.player.deleteQueue(message.guild.id)
      return message.reply("I can't access to voice channel because I can't access to voice channel.")
    }
      const videos = r.videos.slice( 0, 1 )
          videos.forEach( function ( v ) {
          const views = String( v.views ).padStart( 10, ' ' )
          let playembed = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setTitle("🎶 I'll add the song to the list! 🎶")
                .setURL(`${v.url}`)
                .setDescription(`💡`+ `\`${ v.title }\`` + `has been added to the song request list!`)
                .addField("length", `${ v.timestamp }`, true)
                .addField("Publisher", `${ v.author.name }`, true)
                .addField("views", `${views}`, true)
                .addField("Requester", `${message.author}`, true)
                .setThumbnail(`${v.image}`)
            message.channel.send({ embeds: [playembed] })
          })
    searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0])
    if (!queue.playing) await queue.play()
    }
}