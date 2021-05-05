module.exports = {
  name: "ticket",
  description: "Open a private ticket where you can chat with the Administration to solve any problem that you would want to get off your chest",
  async execute(message, param){
    let client = param[4];
    const channel = await message.guild.channels.create(`ticket: ${message.author.username}`);
    channel.setParent('835184320317751307');

    channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: false,
      VIEW_CHANNEL: false
    })
    channel.updateOverwrite((message.author, {
      SEND_MESSAGES: true,
      VIEW_CHANNEL: true
    }))

    const reactionMessage = await channel.send("We are here to back you up :grin:")

    try{
      await reactionMessage.react("🔐");
      await reactionMessage.react("❎");
    }catch(err){
      channel.send("An Error Occurred");
      throw err;
    }

    const collector = reactionMessage.createReactionCollector((reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission("ADMINISTRATOR"), {dispose: true});

    collector.on("collect", (reaction, user) => {
      switch(reaction.emoji.name){
        case "🔐":
          channel.updateOverwrite(message.author, { SEND_MESSAGES: false});
          break;
        case "❎":
          channel.send("Deleting ticket in 5 seconds");
          setTimeout(() => channel.delete(), 5000);
      }
    });
    message.channel.send(`We will help you in ${channel}`).then((msg) => {
      setTimeout(() => msg.delete(), 7000);
    }).catch((err) => {
      throw err;
    })

  }
}