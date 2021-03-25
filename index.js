const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// ================= START BOT CODE ===================
const Discord = require('discord.js')
const Canvas = require('canvas');
const { registerFont } = require('canvas');
const client = new Discord.Client()



const prefix = '-';
registerFont('./myfonts/Texturina-BlackItalic-opsz=12.ttf', { family: 'Texturina' })
 

const fs = require('fs');
let db = JSON.parse(fs.readFileSync("./database.json", "utf8"));
 
client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}


const ytdl = require('ytdl-core');
var servers = {};

client.once('ready', () => {
  client.user.setActivity("Brilliant minds at work", {type: "WATCHING"});
  console.log("Awaiting commands!")
})

client.on('message', async message => {
  if(!message.guild){
    client.commands.get("dm").execute(message, client);
  }
  if(message.mentions.has(client.user)){
    message.reply("My Prefix is ***-***")
  }
  if(!message.content.startsWith(prefix)){
    client.commands.get("lingual").execute(message, db, fs);
  };

  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  
  const command = args.shift().toLowerCase();

  switch(command){
    case "command":
      client.commands.get("command").execute(message, args, Discord);
      break;
    case "rank":
      client.commands.get("myrank").execute(message, db, Discord);
      break;
    case "ping":
      client.commands.get("ping").execute(message);
      break;
    case "help":
      client.commands.get("help").execute(message, Discord);
      break;
    case "poll":
      console.log(args);
      client.commands.get("poll").execute(message, args, Discord);
      break;
    case "play":
      client.commands.get("play").execute(message, args);
      break;
    case "leave":
      client.commands.get("leave").execute(message, args);
      break;
      
  }
  
})

client.login(process.env.DISCORD_TOKEN) // Replace XXXXX with your bot token
console.log("Bot is online.")
