module.exports = {
  name: "roles",
  description: "A reaction role system",
  async execute(message, param){
    let Discord = param[1];
    let client = param[4];
    let args = param[0];
    let raw_cmd = args.join(' ');
    console.log(raw_cmd);
    let interm_cmd = raw_cmd.split("+");
    let title;
    let desc;
    let fields = [];
    let rols = [];
    let emj = [];


    for(const statement of interm_cmd){
      let detail = statement.split(/ +/);
      let cmd = detail.shift().toLowerCase()
      detail = detail.join(" ");
      console.log(cmd);
      console.log(detail);

      switch(cmd){
        case "title":
          title = detail;
          break;
        case "desc":
          desc = detail;
          break;
        case "emoji":
          let tmp = detail.split(" ");
          if(tmp[tmp.length-1] == ""){
            tmp.pop();
          }
          let emoji = tmp.shift();
          tmp = tmp.join(" ");
          fields.push({name: tmp, value: emoji});

      }
    }

    for(let rol of fields){
      emj.push(rol.value);
    }
    console.log(rols)

    let embed = new Discord.MessageEmbed()
    .setColor("#e42643")
    .setTitle(title)
    .setDescription(desc)
    .addFields(
      fields
    );

    let messageEmbed = await message.channel.send(embed);
    for(const e of emj){
      messageEmbed.react(e);
    }

    client.on('messageReactionAdd', async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;
      for(const re of fields){
        if(reaction.emoji.name === re.value){
          let rname = message.guild.roles.cache.find(role => role.name == re.name);
          await reaction.message.guild.members.cache
          .get(user.id)
          .roles.add(rname);
        }
      }
      

    });

    client.on('messageReactionRemove', async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;
      for(const re of fields){
        if(reaction.emoji.name === re.value){
          let rname = message.guild.roles.cache.find(role => role.name == re.name);
          await reaction.message.guild.members.cache
          .get(user.id)
          .roles.remove(rname);
        }
      }
    });

  }
}


