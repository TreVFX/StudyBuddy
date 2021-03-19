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
registerFont('./Texturina-BlackItalic-opsz=12.ttf', { family: 'Texturina' })
 
const trevor = "733530045355655250";
const nandana = "762269923262857226"




const fs = require('fs');
let db = JSON.parse(fs.readFileSync("./database.json", "utf8"));
 
client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}

var helpmsg = "`?vp ?help ?ping ?quote`"
var dispatcher

client.on("ready", () =>{
    /*client.users.fetch("762269923262857226").then(user => {
      user.send("See!")
    })*/

})

client.on('message', async receivedMessage => {
    // Prevent bot from responding to its own messages
    client.user.setActivity("Under Maintenance.")
    if(!receivedMessage.content.startsWith(prefix) && !receivedMessage.author.bot){
      client.commands.get('lingual').execute(receivedMessage, db, fs);
    }
    if(!receivedMessage.guild && !receivedMessage.author.bot){
      if(receivedMessage.author == trevor){
        var sms = sentFromT(receivedMessage);
        var result = receivedMessage.content.substr(receivedMessage.content.indexOf(" ") + 1);
        receivedMessage.author.send("Sent to: " + sms.toString())
        
        return client.users.fetch(sms).then(user => {user.send(result)});

      }else if(receivedMessage.author == nandana){
        var sms = sentFromT(receivedMessage);
        var result = receivedMessage.content.substr(receivedMessage.content.indexOf(" ") + 1);
        if(sms == "mystery"){
          receivedMessage.author.send("Sent to: #murder_mystery. The tale continues")
        }
        return client.channels.cache.get("803175779533586443").send(result);
      }

      var msg = receivedMessage.author.toString() + ", says: " + receivedMessage.toString();
      return client.users.fetch(trevor).then(user => {
      user.send(msg)
    })
    }
    if(!receivedMessage.content.startsWith(prefix) || receivedMessage.author.bot || !receivedMessage.guild) return;
 
    const args = receivedMessage.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
 
    if(command === 'ping'){
        client.commands.get('ping').execute(receivedMessage, args);
    } else if(command === 'quote'){
      client.commands.get('quote').execute(receivedMessage, args);
    } else if(command === 'sing'){
      client.commands.get('sing').execute(receivedMessage, args);
    } else if(command === 'help'){
      client.commands.get('help').execute(receivedMessage);
    } else if(command === 'rank'){
      client.commands.get('myrank').execute(receivedMessage, db, Discord);
    } else if(command === 'join'){
      let ment = receivedMessage.mentions.members.first()
      client.emit('guildMemberAdd', ment);
      receivedMessage.delete().then(msg => console.log(`Deleted message from ${msg.author.username} immediately`)).catch(console.error);
    }
    
})

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px Texturina`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};

client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'bot-development');
	if (!channel) return;
  // Set a new canvas to the dimensions of 700x250 pixels
	const canvas = Canvas.createCanvas(700, 250);
	// ctx (context) will be used to modify a lot of the canvas

	const ctx = canvas.getContext('2d');

  
	const background = await Canvas.loadImage('./wallpaper.png');
	// This uses the canvas dimensions to stretch the image onto the entire canvas
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
	// Use helpful Attachment class structure to process the file for you
	
  // Select the color of the stroke
	ctx.strokeStyle = '#74037b';
	// Draw a rectangle with the dimensions of the entire canvas
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

  let welcome = "Welcome New Scholar"
  ctx.font = applyText(canvas, welcome);;
	// Select the style that will be used to fill the text in
	ctx.fillStyle = '000000';
  ctx.fillText(welcome, canvas.width / 3, canvas.height / 3)
  // Select the font size and type from one of the natively available fonts
	ctx.font = applyText(canvas, member.displayName);;
	// Select the style that will be used to fill the text in
	ctx.fillStyle = '000000';

	// Actually fill the text with a solid color
	ctx.fillText(member.displayName, canvas.width / 2.5, canvas.height / 1.8);

  // Pick up the pen
	ctx.beginPath();
	// Start the arc to form a circle
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	// Put the pen down
	ctx.closePath();
	// Clip off the region you drew on
	ctx.clip();

  // Wait for Canvas to load the image
	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	// Draw a shape onto the main canvas
	ctx.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Welcome to the server, ${member}!`, attachment);
});


function sentFromT(receivedMessage){
   const args = receivedMessage.content.split(/ +/);
   
   const id = args.shift().toString();
   
   return id;

}


client.login(process.env.DISCORD_TOKEN) // Replace XXXXX with your bot token
console.log("Bot is online.")
