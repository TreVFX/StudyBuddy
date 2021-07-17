module.exports = {
  name: 'rules',
  description: "Gives you an overview of the key rules",
  execute(message, param) {
    
    let Discord = param[1];

    let embed = new Discord.MessageEmbed()
    .setColor("#00A2B3")
    .setTitle("Rules")
    .setURL('https://discord.gg/Rv3jV8F')
    .setDescription("These are the server rules!")
    .addFields(
      {name:'RULE 1', value: 'Be respectful - treat others like you would like to be treated'},
      {name:'RULE 2', value: 'Do not be toxic - we are here to help each other!'},
      {name:'RULE 3', value: 'Do not be offensive'},
      {name:'RULE 4', value: 'Respect others'},
      {name:'RULE 5', value: 'Do not ping everyone'},
      {name:'RULE 6', value: 'If anyone complains because  your nickname is offensive then pls set a new nickname '},
      {name:'RULE 7', value: 'Only talk English in channels other than language help in the "Language" channels.'},
      {name:'RULE 8', value: 'Post content in their appropriate channels'},
      {name:'RULE 9', value: "Don't judge members according to the help they ask for and feel free to ask for help yourself"},
      {name: "THANK YOU", value: "---------------------------------"},
      {name: "CAUTION", value: "Ignoring these rules may lead to you being kicked from the server or other restrictions being put in place."})
      .setFooter('Make sure to check out the rules channel');

    message.channel.send(embed);
  }

}