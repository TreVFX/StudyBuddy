module.exports = {
    name: 'myrank',
    description: "this is a ranking system!",
    execute(message, db, Discord){
      let userInfo = db[message.author.id];
      let member = message.mentions.members.first();
      let embed = new Discord.MessageEmbed().setColor(0x4286f4).addField("Level", userInfo.level).addField("XP", userInfo.xp+"/100");
      if(!member) return message.channel.send(embed)
      let memberInfo = db[member.id]
      let embed2 = new Discord.MessageEmbed().setColor(0x4286f4).addField("Level", memberInfo.level).addField("XP", memberInfo.xp+"/100")
      message.channel.send(embed2)
    }
}