const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

module.exports = {
  name: "play",
  description: "Playing",
  async execute(message, param){
    let args = param[0];
    
    const voiceChannel = message.member.voice.channel;
    if(!voiceChannel) return message.channel.send("Please enter a voice channel");
    if(!args[0]) return message.channel.send("Please enter a song");

    const validURL = (str) =>{
      var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
      if(!regex.test(str)){
          return false;
      } else {
          return true;
      }
    }

    if(validURL(args[0])){
      message.channel.send("Valid URL");
      const connection = await voiceChannel.join();
      const stream = ytdl(args[0], {filter: 'audioonly'});

      connection.play(stream, {seek: 0, volume: .6})
      .on('finish', () =>{
        voiceChannel.leave();
      });

      await message.reply("Now playing ***Your Link***");
      return;
    }

    const connection = await voiceChannel.join();

    const videoFinder = async (query) => {
      const videoResult = await ytSearch(query);
      
      return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
    }

    const video = await videoFinder(args.join(' '));

    if(video){
      const stream = ytdl(video.url, {filter: 'audioonly'});
      connection.play(stream, {seek: 0, volume: .6})
      .on('finish', () =>{
        voiceChannel.leave();
      });
      ytdl.getInfo(video.url, function(err, info) {
        console.log(info.thumbnail_url) // "Adele - Hello" thumbail
      });

      await message.reply(`:thumbsup: Now Playing ***${video.title}***`)
      

    }else{
      message.channel.send("No results found")
    }
  }
}