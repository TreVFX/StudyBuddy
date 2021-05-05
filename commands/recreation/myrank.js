module.exports = {
    name: 'rank',
    description: "Displays your current rank, which you can increase by writing messages - but no spamming!",
    execute(message, param){

      let Discord = param[1];
      let db = param[2];

      let userInfo = db[message.author.id];
      let member = message.mentions.members.first();

      if(member == "733530045355655250" || message.author.id == "733530045355655250"){ 
        return message.channel.send("This user is non-rankable because of his access to the database.");
      }
      let embed = new Discord.MessageEmbed().setColor(0x4286f4).addField("Level", userInfo.level).addField("XP", userInfo.xp+"/100");
      if(!member) return message.channel.send(embed);
      let memberInfo = db[member.id]
      let embed2 = new Discord.MessageEmbed().setColor(0x4286f4).addField("Level", memberInfo.level).addField("XP", memberInfo.xp+"/100")
      message.channel.send(embed2)
    }
}