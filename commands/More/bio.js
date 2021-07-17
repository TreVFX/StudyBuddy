var bio = {

};

const Database = require("@replit/database");
const db = new Database()
let author


pagination = require("discord.js-pagination");

module.exports = {
    name: 'bio',
    aliases: ['intro', 'details', 'reset', 'admins', 'mods'],
    description: "User details",
    execute(message, param){
    let args = param[0];
    let Discord = param[1];
    let cmd = param[5];
    let client = param[4];
    let admin = [];
    switch(cmd){
      case "admins":
        message.guild.members.cache.find( member =>{
          for(const mem of member){
            if(member.hasPermission('ADMINISTRATOR')) admin.push(mem);
          }
        });
        console.log(admin);
        return;
      /*case "intro":
        author = db.get(message.author.id);
        if(!author){
          db.set(message.author.id, {"name": message.author.username, "intro": args.join(" "), "hobbies": null, "strengths": null}).then(() => {
            message.author.send("Done")
          });
          return;
        }
        db.get(message.author.id).then(value => {
          value.intro = args.join(" ");
          db.set(message.author.id, value);
        })
        break;
      
      case "details":
        let target = message.mentions.members.first();
        
        db.get(target.id).then(value => {
          message.channel.send("Introduction: " + value.intro).then(
            message.channel.send("Strengths: " + value.strengths));
          message.channel.send("Hobbies: " + value.hobbies);
          
        }).catch(error => {
          message.channel.send("Sorry, that user doesn't have an intro yet");
        });
        break;
      
      case "hobbies":
        author = db.get(message.author.id);
        if(!author){
          message.author.send("Please start with an intro");
          return;
        }
        db.get(message.author.id).then(value => {
          value.hobbies = args.join(" ");
          db.set(message.author.id, value);
        })
        break;

      case "strengths":
        let author = db.get(message.author.id);
        if(!author){
          message.author.send("Please start with an intro");
          return;
        }
        db.get(message.author.id).then(value => {
          value.strengths = args.join(" ");
          db.set(message.author.id, value);
        })
        break;*/
      

    }

}}