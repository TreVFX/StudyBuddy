module.exports = {
    name: 'rank',
    description: "Write messages to level up - use this to check your level!",
    execute(message, param){

      let Discord = param[1];
      let db = param[2];

      let userInfo = db[message.author.id];
      let member = message.mentions.members.first();

      if(member == "733530045355655250"  && message.author.id == "734681700759765072"){ 
        return message.member.send("https://tenor.com/view/bbcan6-maddy-poplett-smart-too-smart-intelligent-gif-12416157");
      }
      
      let embed = new Discord.MessageEmbed().setColor(0x4286f4).addField("Level", userInfo.level).addField("XP", userInfo.xp+"/100");
      if(!member) return message.channel.send(embed)
      let memberInfo = db[member.id]
      let embed2 = new Discord.MessageEmbed().setColor(0x4286f4).addField("Level", memberInfo.level).addField("XP", memberInfo.xp+"/100")
      message.channel.send(embed2)
    }
}