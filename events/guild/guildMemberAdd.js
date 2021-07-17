const fs = require('fs');
let db = JSON.parse(fs.readFileSync("./database.json", "utf8"));
const Canvas = require('canvas');

// Pass the entire Canvas object because you'll need to access its width, as well its context

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 50;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};


module.exports = async (Discord, client, prefix, member)=>{
  const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');

  if(!channel) return;

  // Creating the card area
  const canvas = Canvas.createCanvas(500, 125);

  //ctx is used to modify the canvas
  const ctx = canvas.getContext('2d');

  //This deals with the avatar side
  //Setting the colour of the brush

  //This deals with the info
  ctx.font = "30px Georgia";
  ctx.fillStyle = "#ffffff";
  ctx.font = applyText(canvas, member.displayName);

  // Since the image takes time to load, you should await it
  const pic_cards = ["Cards_Blue_Template.png", "Cards_Red_Template.png"]
  let picker = pic_cards[Math.floor(Math.random() * pic_cards.length)]
	const background = await Canvas.loadImage(`./events/guild/images/${picker}`);
	// This uses the canvas dimensions to stretch the image onto the entire canvas
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ffffff";
  ctx.fillText(`<<${member.displayName}>>`, 220, 105);
  // Pick up the pen
  ctx.beginPath();
  // Start the arc to form a circle
  ctx.arc(80, 62, 45, 0, Math.PI * 2, true);
  // Put the pen down
  ctx.closePath();
  // Clip off the region you drew on
  ctx.clip();
  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format:'jpg' }));
  ctx.drawImage(avatar, 25, 10, 105, 105);

  const attachment = new Discord.MessageAttachment(canvas.toBuffer());

  channel.send(attachment);
  channel.send(`Welcome ${member}`)

  console.log("Some one joined!");
}