module.exports = {
  name: "spam",
  aliases: ['s'],
  description: "Open a private channel to spam as much as you want",
  async execute(message, param) {
    let client = param[4];
    let cat
    let categoryID = message.guild.channels.cache.find(ch => ch.name == "Spam" && ch.type === "category");
    
    if(!categoryID){
      message.guild.channels.create('Spam', {
        type: 'category',
        }).then(cid => {
          cat = cid.id;
          cid.updateOverwrite(message.guild.id, {
            SEND_MESSAGE: false,
            VIEW_CHANNEL: false
          });
        });
    }else{
      cat = categoryID.id;
    }
    
    const channel = await message.guild.channels.create(`spam: ${message.author.username}`);
    channel.setParent(cat);

    channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGE: false,
      VIEW_CHANNEL: false
    });
    channel.updateOverwrite(message.author, {
      SEND_MESSAGE: true,
      VIEW_CHANNEL: true,
    });

    const reactionMessage = await channel.send("Post as much nonsense as you please");

    try {
      await reactionMessage.react("🔒");
      await reactionMessage.react("⛔");
    } catch (err) {
      channel.send("Error sending emojis!");
      throw err;
    }

    const collector = reactionMessage.createReactionCollector(
      (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission("ADMINISTRATOR"),
      { dispose: true }
    );

    collector.on("collect", (reaction, user) => {
      switch (reaction.emoji.name) {
        case "🔒":
          channel.updateOverwrite(message.author, { SEND_MESSAGES: false });
          break;
        case "⛔":
          channel.send("Deleting this channel in 5 seconds!");
          setTimeout(() => channel.delete(), 5000);
          break;
      }
    });

    message.channel
      .send(`We will be right with you! ${channel}`)
      .then((msg) => {
        setTimeout(() => msg.delete(), 7000);
        setTimeout(() => message.delete(), 3000);
      })
      .catch((err) => {
        throw err;
      });
  },
};
