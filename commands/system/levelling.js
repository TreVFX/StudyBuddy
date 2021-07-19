module.exports = {
    name: 'level',
    category: 'System',
    cooldown: 600,
    description: "This is a language control module!",
    execute(message, param){

      let db = param[2];
      let fs = param[3];
      rank_sys(message, db, fs);
        
    }
}

function rank_sys(message, db, fs){
  if (!db[message.author.id]) return db[message.author.id] = {
        xp: 7,
        level: 0,
        time: new Date().getMinutes()
      };

  let userInfo = db[message.author.id];

  let timer = new Date().getMinutes();
  
  if((timer - userInfo.time) < 2){
    return console.log(`You need to wait ${timer-userInfo.time} seconds more.`);
  }

  let upgrade = [7, 10, 14];
  let picker = upgrade[Math.floor(Math.random() * upgrade.length)];
  db[message.author.id].xp += picker;

  if(userInfo.xp > 100) {
      userInfo.level++
      userInfo.xp = 0
      message.reply("Congratulations, you level up")
  fs.writeFile("./database.json", JSON.stringify(db), (x) => {
    if (x) console.error(x)
  });
  }
}
