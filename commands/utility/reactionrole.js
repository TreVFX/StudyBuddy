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
          let emoji = tmp.shift();
          tmp = tmp.join(" ");
          fields.push({name: tmp, value: emoji});
          console.log(tmp);

      }
    }


    
    const yellowTeamRole = message.guild.roles.cache.find(role => role.name === "Yellow");
    const blueTeamRole = message.guild.roles.cache.find(role => role.name === "Blue");

    const yellowEmoji = "🧡";
    const blueEmoji = "💙";

    let embed = new Discord.MessageEmbed()
    .setColor("#e42643")
    .setTitle(title)
    .setDescription(desc)
    .addFields(
      fields
    );

    let messageEmbed = await message.channel.send(embed);
    messageEmbed.react(yellowEmoji);
    messageEmbed.react(blueEmoji);

    client.on('messageReactionAdd', async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;
      if (reaction.emoji.name === '🧡') {
        await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add(yellowTeamRole);
  }
      if (reaction.emoji.name === '💙') {
        await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add(blueTeamRole);
      }

    });

    client.on('messageReactionRemove', async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;
      if (reaction.emoji.name === '🧡') {
        await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove(yellowTeamRole);
      }
      if (reaction.emoji.name === '💙') {
        await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove(blueTeamRole);
      }
    });

  }
}


