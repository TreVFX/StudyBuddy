module.exports = {
  name: 'command',
  description: "Embeds!",
  execute(message, param) {
    
    let Discord = param[1];

    let embed = new Discord.MessageEmbed()
    .setColor("#00A2B3")
    .setTitle("Rules")
    .setURL('https://discord.gg/Rv3jV8F')
    .setDescription("this is a embed for server rules!")
    .addFields(
      {name:'RULE 1', value: 'Be respectful'},
      {name:'RULE 2', value: 'Do not be toxic'},
      {name:'RULE 3', value: 'Do not use offensive language'},
      {name:'RULE 4', value: 'Respect others'},
      {name:'RULE 5', value: 'Do not ping everyone'},
      {name:'RULE 6', value: 'If anyone complains because of your nickname is offensive then pls set a new nickname '},
      {name:'RULE 7', value: 'Pls talk English in the server if u wanna talk in any other language u can talk in #other-lan-chat and #no-mic in other language'},
      {name:'RULE 8', value: 'Self promote your self on the #❌self-promo❌ channel. Do not do self promotion on the other channels'},
      {name:'RULE 9', value: 'Do not share nfsw or hentai'})
      .setImage('https://media.discordapp.net/attachments/775993842846924800/817775217739956234/Untitled9_20210127000241-1.png?width=427&height=427')
      .setFooter('Make sure to check out the rules channel');

    message.channel.send(embed);
  }

}