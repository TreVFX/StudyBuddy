module.exports = {
  name: "type",
  description: "Typing Test",
  aliases: ["stopType"],
  execute(message, param){
    let cmd = param[5];
    if(cmd == "stopType"){
      return message.channel.stopTyping();
    }
    message.channel.startTyping();
  }
}