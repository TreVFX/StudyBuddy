module.exports = {
    name: 'lingual',
    category: 'System',
    description: "This is a language control module!",
    execute(message, param){
      language_mod(message)
        
    }
}



var words;

function language_mod(message){
  words = message.content.toLowerCase().split(" ");
  responses = [message.author.toString() + ", Captain's orders. And get this man", "Listen to the Billionare " + message.author.toString(), message.author.toString() + ", watch it.", message.author.toString() + ", she's got a point.", message.author.toString() + ". Ay! Brush your teeth after that comment!", message.author.toString() + ", I'm telling!. <@&776867637418000455> !!!!", message.author.toString() + ", Imma pretend I didn't hear that.", message.author.toString() + ", Karma's on her way and she bringing <@&776867637418000455> with her.", message.author.toString() + ", you heard him!", message.author.toString() + ", just be nice"];
  
  for(var j=0; j < bad_words.length; j++){
    for(var i=0; i < words.length; i++){
      if(words[i] == bad_words[j]){
        idx = Math.floor(Math.random() * responses_gif.length)
        message.author.send(responses_gif[idx]);
        message.author.send(responses[idx]);
        return message.delete().then(msg => console.log(`Deleted message ${words} from ${msg.author.username} immediately`)).catch (console.error);
      }
    }
  }
}

bad_words = ['arse', 'ass', 'asshole', 'bastard', 'bitch', 'bollocks', 'brotherfucker', 'bugger', 'bullshit', 'child-fucker', 'crap', 'cunt', 'damn', 'effing', 'fatherfucker', 'frigger', 'fuck', 'goddamn', 'godsdamn', 'horseshit', 'motherfucker', 'nigga', 'nigger', 'prick', 'shit', 'shitass', 'sisterfucker', 'slut', 'whore', 'twat', 'wtf', 'beaver','beaverr'
];
responses_gif = ["https://tenor.com/view/captain-america-marvel-avengers-gif-14328153", "https://tenor.com/view/marvel-tony-stark-iron-man-gif-18079972", "https://tenor.com/view/funny-or-die-will-ferrell-watch-your-mouth-filthy-mouth-mouth-gif-4427315", "https://tenor.com/view/language-please-nora-walker-brenda-strong-13reasons-why-watch-your-language-gif-17599983", "https://tenor.com/view/your-language-is-offensive-watch-your-mouth-zach-galifianakis-gif-13885320", "https://tenor.com/view/adminadmin-hesaida-badword-gif-18787905", "https://tenor.com/view/pardon-excuse-me-what-gif-15268221", "https://tenor.com/view/clapping-leonardo-dicaprio-leo-dicaprio-well-done-applause-gif-16463566", "https://tenor.com/view/schitts-creek-will-not-be-tolerated-talking-gif-15501711", "https://tenor.com/view/watch-your-language-words-talk-dont-be-harsh-derek-luke-gif-15626011"];