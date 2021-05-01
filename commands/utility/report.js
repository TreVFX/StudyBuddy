module.exports = {
  name: "report",
  aliases: ["bug", "caveat"],
  description: "Report a bug to the bot developers",
  execute(message, param){
    let args = param[0];
    message.guild.roles.cache.get("835177233823170580").members.forEach(member => member.send(args.join(" ")));
    return message.reply(", your message has been sent. Thank you.")
  }
}