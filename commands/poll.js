module.exports = {
  name: "poll",
  description: "This is a polling system",
  execute(message, args, Discord){
    let embed = new Discord.MessageEmbed()
    .setColor(0x4286f4)
    .setTitle("Vote")
    .setDescription("-poll for a simple Yes or No poll on whatever topic(To be enhanced soon)");

    if(!args[0]){
      message.channel.send(embed);
      return;
    }

    let msgArgs = args.join(" ");
    let voteMsg = new Discord.MessageEmbed()
    .setColor(0x4286f4)
    .setTitle("Vote")
    .addField(message.author.username + " asks", msgArgs);

    message.channel.send(voteMsg).then(messageReaction => {
      messageReaction.react("👍");
      messageReaction.react("👎")
    })

    return message.delete()
    
  }
}