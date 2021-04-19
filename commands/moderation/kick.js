module.exports = {
  name: "kick",
  description: "An admin Command to kick trouble makers",
  aliases: ['yeet', 'kangarookick', 'goal!'],
  execute(message, param){
    if(!message.member.roles.cache.has("776867637418000455")){
      return message.channel.send("Sorry only mods can ban people");
      }
      const target = message.mentions.users.first();
        if(target){
            const memberTarget = message.guild.members.cache.get(target.id);
            memberTarget.kick();
            message.channel.send("User has been kicked");
        }else{
            message.channel.send(`You coudn't kick that member!`);
        }
    
  }
}