module.exports = {
  name: "dm",
  description: "Controls what happens in the dms",
  execute(message, param){

    let client = param[4]

    const dmMsg = message.content.split(/ +/);
    const dmCom = dmMsg.shift();
    switch(dmCom){
      case "mystery":
        const channel = client.channels.cache.get("803175779533586443") 
        channel.send(dmMsg.join(" "));
        break;
    }
  }
}