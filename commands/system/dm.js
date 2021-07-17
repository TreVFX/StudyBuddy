module.exports = {
  name: "dm",
  category: "System",
  description: "Controls what happens in the dms",
  execute(message, param){

    let client = param[4];
    let trev = "733530045355655250";
    let args = param[0];

    const dmMsg = message.content.split(/ +/);
    const dmCom = dmMsg.shift();
    if(message.author == "733530045355655250"){
      trev.send(message);
    }else{
      let rec = client.guilds.get("776853026643378304").members.cache.get(dmCom);
      rec.send(dmMsg);
    }

    
    switch(dmCom){
      case "mystery":
        const channel = client.channels.cache.get("803175779533586443") 
        channel.send(dmMsg.join(" "));
        break;
    }
  }
}