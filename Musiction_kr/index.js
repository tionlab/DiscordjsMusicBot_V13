const { Client, Collection } = require("discord.js");
const { Player } = require("discord-player");
const { prefix, token } = require("./config.json");
/* We recommend use env, not config.json. This is just example, Edit it free! */
const fs = require("fs");

const client = new Client({
  intents: 32767,
});

client.commands = new Collection();
client.player = new Player(client, {
  ytdlOptions: {
    filter: "audioonly",
    quality: "highestaudio",
    format: "mp3",
    highWaterMark: 1 << 30,
  },
});

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  setInterval(() => {
    client.user.setActivity("음악을 ", {
      type: "LISTENING",
    });
  }, 1000);
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/[ ]+/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args, client);
  } catch (error) {
    console.error(error);
    message.reply("에러가 발생했습니다!");
  }
});

client.login(token);
