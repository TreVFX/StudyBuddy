module.exports = {
  name: "ban",
  description: "An admin Command to ban trouble makers",
  execute(message, param){
    let target = message.mentions.users.first();
    if(!message.member.roles.cache.has('776867637418000455')){
      return message.author.send("Sorry, you don't have the required permissions to do that");
    } else if(!target){
      return message.channel.send("Please mention the rogue scholar");
    } else if(target.member.roles.cache.has("776867637418000455")){
      return message.reply("That's an admin dude :rofl:")
    }

    const memberTarget = message.guild.members.cahe.get(target.id);
    let rogue = target.username;
    console.log(rogue)

    memberTarget.ban();
    return message.channel.send(`${rogue} has been banned from the server`);
    
  }
}