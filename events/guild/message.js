const fs = require('fs');
let db = JSON.parse(fs.readFileSync("./database.json", "utf8"));

const cooldowns = new Map();

module.exports = (Discord, client, prefix, message)=>{
  const args = message.content.slice(prefix.length).split(/ +/);

  const commandName = args.shift().toLowerCase();

  if(commandName === "join"){
    let joiner = message.mentions.members.first();
    if(!joiner) return client.emit("guildMemberAdd", message.member);
    return client.emit("guildMemberAdd", joiner);
  }

  let param = [args, Discord, db, fs, client, commandName]

  if(!message.author.bot){
    if(!message.content.startsWith(prefix)){
      if(message.mentions.has(client.user)){
        return message.reply("My Prefix is ***-***")
        }
      const command = client.commands.get("level");
      client.commands.get("lingual").execute(message, param);
      let counter = countDown(message, command, Discord);
      if(counter == true){
        return;
      }else{
        client.commands.get("level").execute(message, param);
      };
      
    }
  }else{
    return
  };

  if(!message.guild){
    client.commands.get("dm").execute(message, client);
  }
  
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if(!command) return;
  let counter = countDown(message, command, Discord);
  if(counter != undefined) return;
  try {
  command.execute(message, param);
  } catch (error) {
    console.log(error)
    message.reply('there was an error trying to execute that command!');
  }

}

function countDown(message, command, Discord){
  //If cooldowns map doesn't have a command.name key then create one.
  if(!cooldowns.has(command.name)){
    cooldowns.set(command.name, new Discord.Collection());
  }

  const current_time = Date.now();
  const time_stamps = cooldowns.get(command.name);
  const cooldown_amount = (command.cooldown) * 1000;

  //If time_stamps has a key with the author's id then check the expiration time to send a message to a user.
  if(time_stamps.has(message.author.id)){
    const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

    if(current_time < expiration_time){
      const time_left = (expiration_time - current_time) / 1000;
      if(command.name == "level") return true;
      return message.reply(`Please wait ${time_left.toFixed(1)} more seconds before using ${command.name}`), time_left;
    }
  }

  //If the author's id is not in time_stamps then add them with the current time.
  time_stamps.set(message.author.id, current_time);
  //Delete the user's id once the cooldown is over.
  setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);
}