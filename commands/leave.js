module.exports = {
  name: "leave",
  description: "Exit",
  async execute(message, args){
    const voiceChannel = message.member.voice.channel;

    if(!voiceChannel) return message.reply("You need to be in a voice channel to execute that command");
    await voiceChannel.leave();
    await message.channel.send("Leaving voice channel :smiling_face_with_tear:")
  }
}