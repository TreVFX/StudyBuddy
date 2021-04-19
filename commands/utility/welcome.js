// Pass the entire Canvas object because you'll need to access its width, as well its context

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};

module.exports = {
  name: "welcome",
  description: "It welcomes new server members",
  async execute(member){
    const channel = member.guild.channels.cache.find(ch => ch.name === 'bot-development');

    // Creating the card area
    const canvas = Canvas.createCanvas(500, 125);
    
    //ctx is used to modify the canvas
    const ctx = canvas.getContext('2d');

    //This deals with the avatar side
    //Setting the colour of the brush
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#ffffff";
    ctx.fillStyle = "darkred";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(5, 0, 500, 120);
    ctx.shadowBlur = 10;
    ctx.shadowColor = "darkred"
    ctx.beginPath()
    ctx.moveTo(120, 0);
    ctx.lineTo(145, 120);
    ctx.lineTo(5, 120);
    ctx.lineTo(5, 0);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fill();

    //This deals with the info
    ctx.font = "30px Georgia";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("WELCOME", 250, 30);
    ctx.font = applyText(canvas, member.displayName);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`<<${member.displayName}>>`, 250, 60);
    ctx.font = "23px Georgia";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Thanks for joining our scholars", 250, 90);
    ctx.font = "10px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Feel free to look around", 230, 110);

    // Pick up the pen
    ctx.beginPath();
    // Start the arc to form a circle
    ctx.arc(60, 70, 50, 0, Math.PI * 2, true);
    // Put the pen down
    ctx.closePath();
    // Clip off the region you drew on
    ctx.clip();
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(avatar, 5, 15, 105, 105);


    const attachment = new Discord.MessageAttachment(canvas.toBuffer());

    channel.send(attachment)

    console.log("Some one joined!");
  }
}
