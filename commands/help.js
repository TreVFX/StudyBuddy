module.exports = {
    name: 'help',
    description: "this is a help command!",
    execute(message, Discord){
        let embed = new Discord.MessageEmbed()
    .setColor("#00A2B3")
    .setTitle("Commands")
    .setURL('https://www.google.com')
    .setDescription("Here are my commands!")
    .addFields(
      {name:'-help', value: 'Displays this help message'},
      {name:'-ping', value: 'Destroys you at ping pong'},
      {name:'-rank', value: 'Displays your current rank'},
      {name:'-poll', value: "Let's you create a simple yes or no vote"},
      {name:'-play', value: 'Lets you play music. \n-play <name of song>\n Or\n-play <video URL>'})
      .setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbITGb20Lq6Dng2T6SZmn6rSRQCJobHgmhig&usqp=CAU")
      .setFooter('Make sure to check out the rules channel');

    message.channel.send(embed);
        
    }
}