module.exports = {
    name: 'sing',
    description: "this is a sing command!",
    execute(message, param){
      f1(message, param[0]);
      
    }
}

async function f1(message, args) {
   if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
        
        if(args.length > 0){
          console.log("I'm singing your song")
          song = args.toString()
          dispatcher = connection.play(ytdl(song, { filter: 'audioonly' }));
          dispatcher.setVolume(0.5);
          dispatcher.on('finish', () => {
              console.log('Finished playing!');
          });
        }else{
          console.log("Default song")
          dispatcher = connection.play('https://www.youtube.com/watch?v=ZlAU_w7-Xp8');
          dispatcher.setVolume(0.5);
          dispatcher.on('finish', () => {
              console.log('Finished playing!');
      })};
    }else{
        message.reply('You need to join a voice channel first!');
      }
}