const fs = require('fs');
let db = JSON.parse(fs.readFileSync("./database.json", "utf8"));

module.exports = (Discord, client, prefix, message)=>{
  const args = message.content.slice(prefix.length).split(/ +/);

  const commandName = args.shift().toLowerCase();

  if(commandName === "join"){
    return client.emit("guildMemberAdd", message.member)
  }

  let param = [args, Discord, db, fs, client, commandName]

  if(!message.author.bot){
    if(!message.content.startsWith(prefix)){
      if(message.mentions.has(client.user)){
        message.reply("My Prefix is ***-***")
        }
      return client.commands.get("lingual").execute(message, param);
    }
  }else{
    return
  };

  if(!message.guild){
    client.commands.get("dm").execute(message, client);
  }
  
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if(!command) return;

  try {
  command.execute(message, param);
  } catch (error) {
    console.log(error)
    message.reply('there was an error trying to execute that command!');
  }

}

