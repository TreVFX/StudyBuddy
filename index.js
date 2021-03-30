const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// ================= START BOT CODE ===================
const Discord = require('discord.js')
const Canvas = require('canvas');
const { registerFont } = require('canvas');
const client = new Discord.Client({
  partials: ['MESSAGE', 'REACTION', 'CHANNEL']
})



const { prefix } = require('./config.json');
registerFont('./myfonts/Texturina-BlackItalic-opsz=12.ttf', { family: 'Texturina' })
 

const fs = require('fs');
let db = JSON.parse(fs.readFileSync("./database.json", "utf8"));
 
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for(const folder of commandFolders){ 
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for(const file of commandFiles){
      const command = require(`./commands/${folder}/${file}`);
  
      client.commands.set(command.name, command);
  }
}


const ytdl = require('ytdl-core');
var servers = {};

client.once('ready', () => {
  client.user.setActivity("Brilliant minds at work", {type: "WATCHING"});
  console.log("Awaiting commands!")
})

client.on('message', async message => {

  const args = message.content.slice(prefix.length).split(/ +/);
  
  const commandName = args.shift().toLowerCase();

  let param = [args, Discord, db, fs, client]

  if(message.author.bot) return;

  if(!message.guild){
    client.commands.get("dm").execute(message, client);
  }
  if(message.mentions.has(client.user)){
    message.reply("My Prefix is ***-***")
  }
  if(!message.content.startsWith(prefix)){
    client.commands.get("lingual").execute(message, param);
  };

  if(!message.content.startsWith(prefix)) return;


  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if(!command) return;

  try {
	command.execute(message, param);
  } catch (error) {
    console.log(error)
    message.reply('there was an error trying to execute that command!');
  }
  
})


client.login(process.env.DISCORD_TOKEN) // Replace XXXXX with your bot token
console.log("Bot is online.")
