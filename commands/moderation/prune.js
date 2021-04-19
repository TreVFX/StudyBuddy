module.exports = {
  name: "prune",
  description: "This is a command that deletes a number of messages in the channel it is used in.",
  aliases: ['clear'],
  execute(message, param){
    let number = parseInt(param[0]);;
    if(isNaN(number)){
      return message.reply("I need a number :grin:")
    }else if (number < 2 || number > 100) {
	    return message.reply('You need to input a number between 2 and 100.');
    }
    message.channel.bulkDelete(number, true).catch(err => {
      console.error(err);
	    message.channel.send('Sorry, a weird error occurred. Please try again later');
    });
  }
}