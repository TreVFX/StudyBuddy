const express = require('express');
const app = express();
const port = 3000;
const path = require("path");
const router = express.Router();

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});
router.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/about.html'));
  //__dirname : It will resolve to your project folder.
});
router.get('/contact',function(req,res){
  res.sendFile(path.join(__dirname+'/contact.html'));
  //__dirname : It will resolve to your project folder.
});

/*app.get('/', (req, res) =>
  res.send('Hello World!\n let param = [args, Discord, db, fs, client]'));*/

app.use('/', router);
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// ================= START BOT CODE ===================
const Discord = require('discord.js')
const { registerFont } = require('canvas');
const client = new Discord.Client({
  partials: ['MESSAGE', 'REACTION', 'CHANNEL']
})

const { prefix } = require('./config.json');

registerFont('./myfonts/Texturina-BlackItalic-opsz=12.ttf', { family: 'Texturina' })
 
 client.commands = new Discord.Collection();
 client.events = new Discord.Collection();

//Loads the handlers
['command_handler', 'event_handler'].forEach(handler =>{
  require(`./handlers/${handler}`)(client, Discord, prefix);
})


//Bot token and logging in to the bot
client.login(process.env.DISCORD_TOKEN);