const weather = require('weather-js');

module.exports = {
  name: "weather",
  aliases: ['forecast'],
  description: "Information about the weather",
  execute(message, param) {
    let args = param[0];
    let Discord = param[1];
    let cmd = param[5];
    const days = {
      "Monday": 0, "Tuesday": 1, "Wednesday": 2, "Thursday": 3, "Friday": 4
    }
    switch(cmd){
      case "weather":
        weather.find({search: args.join(" "), degreeType: 'C'}, function (error, result){
            if(error) return message.channel.send(error);
            if(!args[0]) return message.channel.send('Please specify a location')

            if(result === undefined || result.length === 0) return message.channel.send('**Invalid** location');

            var current = result[0].current;
            var location = result[0].location;

            const weatherinfo = new Discord.MessageEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Weather forecast for ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor(0x111111)
            .addField('Timezone', `UTC${location.timezone}`, true)
            .addField('Degree Type', 'Celsius', true)
            .addField('Temperature', `${current.temperature}°`, true)
            .addField('Wind', current.winddisplay, true)
            .addField('Feels like', `${current.feelslike}°`, true)
            .addField('Humidity', `${current.humidity}%`, true)
            .setFooter('Thanks to Arnob !!1919# and MXD ✓#3963 for the help!');
            message.channel.send(weatherinfo);
            });
          break;
      case "forecast":
        let pred = args.shift();
        weather.find({search: args.join(" "), degreeType: 'C'}, function (error, result){
            if(error) return message.channel.send(error);
            if(!args[0]) return message.channel.send('Please specify a location')

            if(result === undefined || result.length === 0) return message.channel.send('**Invalid** location');

            var current = result[0].current;
            var forecast = result[0].forecast[days[pred]];
            var location = result[0].location;

          try{
              const weatherinfo = new Discord.MessageEmbed()
              .setDescription(`**${forecast.skytextday}**`)
              .setAuthor(`Weather forecast for ${location.name}`)
              .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWciKdPwrNYU_hBOKjWF-EhP_TgEJZLmWzGQ&usqp=CAU")
              .setColor(0x111111)
              .addField('Timezone', `UTC${location.timezone}`, true)
              .addField('Date', `${forecast.date}`, true)
              .addField('Precipitation', `${forecast.precip}`, true)
              .setFooter('Thanks to Arnob !!1919# and MXD ✓#3963 for the help!');
              message.channel.send(weatherinfo);
          }catch(error){
            message.channel.send("Sorry, I can't figure that out");
          }
        });
    }

  }

}