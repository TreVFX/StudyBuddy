module.exports = {
    name: 'help',
    description: "Displays this help message",
    execute(message, param){
      let client = param[4];
      let Discord = param[1];
      let fs = param[3];
      var descriptions = [];

      const commandFolders = fs.readdirSync(`./commands`);
      for(const cmd of client.commands){
        if(cmd[1].category != "System"){
          descriptions.push({name: `-${cmd[1].name}`, value: `${cmd[1].description}`})
        }else{
          continue;
        }
      }        
        

  

      let embed = new Discord.MessageEmbed()
      .setColor("#00A2B3")
      .setTitle("Commands")
      .setURL('https://www.google.com')
      .setDescription("Here are my commands!")
      .addFields(
        descriptions
        )
        .setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbITGb20Lq6Dng2T6SZmn6rSRQCJobHgmhig&usqp=CAU")
        .setFooter('Make sure to check out the rules channel');

      message.channel.send(embed);
        
    }
}