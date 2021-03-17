module.exports = {
    name: 'ranking',
    description: "this is a ranking system!",
    execute(message, db, fs){
      if (!db[message.author.id]) db[message.author.id] = {
        xp: 0,
        level: 0
      };
      let upgrade = [7, 10, 14];
      let picker = upgrade[Math.floor(Math.random() * upgrade.length)];
      db[message.author.id].xp += 4;
      let userInfo = db[message.author.id];
      if(userInfo.xp > 100) {
          userInfo.level++
          userInfo.xp = 0
          message.reply("Congratulations, you level up")
      fs.writeFile("./database.json", JSON.stringify(db), (x) => {
        if (x) console.error(x)
      });
      }

}}