const express = require('express');
const app = express();
const port = 3000;
const path = require("path");
const router = express.Router();

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});
router.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/about.html'));
  //__dirname : It will resolve to your project folder.
});
router.get('/contact',function(req,res){
  res.sendFile(path.join(__dirname+'/contact.html'));
  //__dirname : It will resolve to your project folder.
});

/*app.get('/', (req, res) =>
  res.send('Hello World!\n let param = [args, Discord, db, fs, client]'));*/

app.use('/', router);
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
/*
// Database Preparation
const { MongoClient } = require("mongodb");
const dbName = "V-Base";

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://Trevor-W:<today123>@cluster0.l438t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const mongoclient = new MongoClient(uri);

async function run() {
  try {
    await mongoclient.connect();
    console.log("Connected correctly to server");

    const db = mongoclient.db('sample_mflix');
    const servers = db.collection('servers');

    // Inserting
    let guilds = {
      "guild_id": "776853026643378304",
      "guild_name": "Study Bunnies",
      "promo": "A friendly commuity of scholars",
      "mod_status": true,
      "join_role": "827894579708559361",
      "prefix": "-",
      "date_created": new Date(2020, 5, 7),                                                      
      "owner_id": "733530045355655250"
    }

    const p = await servers.insertOne(guilds);
    const myDoc = await servers.findOne();
    console.log(myDoc)

  }catch (err) {
    console.log(err.stack);
      
  }finally {
    // Ensures that the client will close when you finish/error
    await mongoclient.close();
  }
}
run().catch(console.dir);
*/

// ================= START BOT CODE ===================
const Discord = require('discord.js')
const { registerFont } = require('canvas');
const client = new Discord.Client({
  partials: ['MESSAGE', 'REACTION', 'CHANNEL']
})

const { prefix } = require('./config.json');

registerFont('./myfonts/Texturina-BlackItalic-opsz=12.ttf', { family: 'Texturina' })
 
 client.commands = new Discord.Collection();
 client.events = new Discord.Collection();

//Loads the handlers
['command_handler', 'event_handler'].forEach(handler =>{
  require(`./handlers/${handler}`)(client, Discord, prefix);
})


//Bot token and logging in to the bot
client.login(process.env.DISCORD_TOKEN);