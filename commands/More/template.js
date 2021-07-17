module.exports = {
    name: 'f',
    description: "does f",
    execute(message, param){
    args = param[0];
    target = message.mentions.users.first()
    if(!target){
      return message.reply('Please mention a user you want to f');
    }else if (target){      
      message.channel.send(`Can we get an f in the chat for ${target.username}?`);
    }
}}