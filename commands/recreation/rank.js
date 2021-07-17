const Canvas = require('canvas');

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


module.exports = {
    name: 'rank',
    description: "Displays your current rank, which you can increase by writing messages - but no spamming!",
    async execute(message, param){
      let Discord = param[1];
      let db = param[2]; 

      let userInfo = db[message.author.id];
      let member = message.mentions.users.first();
      if(!member){
        member = message.author;
      }
      let memberInfo = db[member.id]


      // Creating the card area
      const canvas = Canvas.createCanvas(774, 758);

      //ctx is used to modify the canvas
      const ctx = canvas.getContext('2d');


      //This deals with the info
      ctx.fillStyle = "#ffffff";

      // Since the image takes time to load, you should await it
      const background = await Canvas.loadImage(`./commands/recreation/rank.png`);
      // This uses the canvas dimensions to stretch the image onto the entire canvas
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#000000";
      ctx.font = applyText(canvas, member.username);
      ctx.fillText(`Scholar: ${member.username}`, 400, 105);
      ctx.font = "50px Georgia";
      ctx.fillText(`Level: ${memberInfo.level}`, 400, 165);
      ctx.fillText(`XP: ${memberInfo.xp}/100`, 400, 225);

      const attachment = new Discord.MessageAttachment(canvas.toBuffer());

      message.channel.send(attachment);
    }
}