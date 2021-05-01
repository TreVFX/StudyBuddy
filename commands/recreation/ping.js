module.exports = {
    name: 'ping',
    description: "Destroys you at ping-pong. \nGood luck playing pingpong against me!",
    execute(message){
        message.react("👍")
        message.channel.send("https://media.tenor.com/images/18f3ffeaf925ff06c5d79fb0f130fb50/tenor.gif");
        message.channel.send("Whoops! Vaporized " + message.author.toString());
    }
}