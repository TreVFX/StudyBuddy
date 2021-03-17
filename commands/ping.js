module.exports = {
    name: 'ping',
    description: "this is a ping command!",
    execute(message, args){
        message.react("👍")
        message.channel.send("https://media.tenor.com/images/18f3ffeaf925ff06c5d79fb0f130fb50/tenor.gif");
        message.channel.send("Whoops! Vaporized " + message.author.toString());
    }
}