module.exports = {
    name: 'help',
    description: "this is a help command!",
    execute(message){
        helpmsg = "`-help => Shows all the commands.\n-ping => Will destroy you\n-quote => Will give you some random quote.\n-sing youtube-link => This will play the youtube video you gave.(Audio only)`"
        message.channel.send(helpmsg);
        return message.delete().then(msg => console.log(`Deleted message from ${msg.author.username} immediately`)).catch(console.error);
        
    }
}