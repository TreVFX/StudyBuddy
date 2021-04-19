module.exports = {
  name: "poll",
  aliases: ["vote"],
  description: "Ask yes/no questions for people to vote on!",
  execute(message, param){

    let args = param[0];
    let Discord = param[1];
    let client = param[4];
    let yesCount = "█";
    let noCount = "█"; 

    let embed = new Discord.MessageEmbed()
    .setColor(0x4286f4)
    .setTitle("Vote")
    .setDescription("-poll for a simple Yes or No poll on whatever topic(To be enhanced soon)");

    if(!args[0]){
      message.channel.send(embed);
      return;
    }

    let name = message.author.username;
    let img = message.author.displayAvatarURL();

    let msgArgs = args.join(" ");
    let voteMsg = new Discord.MessageEmbed()
    .setColor(0x4286f4)
    .setTitle(":chart_with_upwards_trend: Poll")
    .setDescription(msgArgs)
    .setTimestamp()
    .addFields(
      {name: "Yes", value: `${yesCount}`},
      {name: "No", value: `${noCount}`}
      )
    .setThumbnail(img)
    .setFooter("Bot by Study Bunnies Founders | Poll by " + name);

    message.channel.send(voteMsg).then(messageReaction => {
      messageReaction.react("👍");
      messageReaction.react("👎")
    })

    message.delete()

    client.on('messageReactionAdd', async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;
      if(reaction.emoji.name == "👍"){
        yesCount += "█";
        let editor = new Discord.MessageEmbed()
        .setColor(0x4286f4)
        .setTitle(":chart_with_upwards_trend: Poll")
        .setDescription(msgArgs)
        .addFields(
          {name: "Yes", value: `${yesCount}`},
          {name: "No", value: `${noCount}`}
          )
        .setThumbnail(img)
        .setFooter("Bot by Study Bunnies Founders | Poll by " + name);
        reaction.message.edit(editor);
      }else if(reaction.emoji.name == "👎"){
        noCount += "█";
        let editor = new Discord.MessageEmbed()
        .setColor(0x4286f4)
        .setTitle(":chart_with_upwards_trend: Poll")
        .setDescription(msgArgs)
        .addFields(
          {name: "Yes", value: `${yesCount}`},
          {name: "No", value: `${noCount}`}
          )
        .setThumbnail(img)
        .setFooter("Bot by Study Bunnies Founders | Poll by " + name);
        reaction.message.edit(editor);
      }
      })
    
    client.on('messageReactionRemove', async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;
      if(reaction.emoji.name == "👍"){
        yesCount = yesCount.substring(0, yesCount.length - 1);
        let editor = new Discord.MessageEmbed()
        .setColor(0x4286f4)
        .setTitle(":chart_with_upwards_trend: Poll")
        .setDescription(msgArgs)
        .addFields(
          {name: "Yes", value: `${yesCount}`},
          {name: "No", value: `${noCount}`}
          )
        .setThumbnail(img)
        .setFooter("Bot by Study Bunnies Founders | Poll by " + name);
        reaction.message.edit(editor);
      }else if(reaction.emoji.name == "👎"){
        noCount = noCount.substring(0, noCount.length - 1);
        let editor = new Discord.MessageEmbed()
        .setColor(0x4286f4)
        .setTitle(":chart_with_upwards_trend: Poll")
        .setDescription(msgArgs)
        .addFields(
          {name: "Yes", value: `${yesCount}`},
          {name: "No", value: `${noCount}`}
          )
        .setThumbnail(img)
        .setFooter("Bot by Study Bunnies Founders | Poll by " + name);
        reaction.message.edit(editor);
      }
      })
  }
}