const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://giveaway-bot9.glitch.me/`);
}, 280000);
 
// كل البكجات الي ممكن تحتجها في اي بوت
const { Client, RichEmbed } = require("discord.js");
var { Util } = require('discord.js');
const {TOKEN, YT_API_KEY, prefix, devs} = require('./config')
const client = new Client({ disableEveryone: true})
const ytdl = require("ytdl-core");
const canvas = require("canvas");
const Canvas = require("canvas");
const convert = require("hh-mm-ss")
const fetchVideoInfo = require("youtube-info");
const botversion = require('./package.json').version;
const simpleytapi = require('simple-youtube-api')
const moment = require("moment");
const fs = require('fs');
const util = require("util")
const gif = require("gif-search");
const opus = require("node-opus");
const ms = require("ms");
const jimp = require("jimp");
const { get } = require('snekfetch');
const guild = require('guild');
const dateFormat = require('dateformat');//npm i dateformat
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8');
const hastebins = require('hastebin-gen');
const getYoutubeID = require('get-youtube-id');
const yt_api_key = "AIzaSyDeoIH0u1e72AtfpwSKKOSy3IPp2UHzqi4";
const pretty = require("pretty-ms");
client.login(TOKEN);
const queue = new Map();
var table = require('table').table
const Discord = require('discord.js');
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
 

client.on('ready',  () => {
  console.log('');
});

const developers = ["439003555077160961", "662305341580509233"];
const adminprefix = `${prefix}`;
client.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
      if (!developers.includes(message.author.id)) return;
      
  if (message.content.startsWith(adminprefix + 'pl')) {
    client.user.setGame(argresult);
      message.channel.send("**:white_check_mark: | The Playing Status Has Been Changed To : ``"
   + `${argresult}` + "``**")
  } else 
  if (message.content.startsWith(adminprefix + 'wt')) {
  client.user.setActivity(argresult, {type:'WATCHING'});
      message.channel.send("**:white_check_mark: | The Watching Status Has Been Changed To : ``"
   + `${argresult}` + "``**")
  } else 
  if (message.content.startsWith(adminprefix + 'ls')) {
  client.user.setActivity(argresult , {type:'LISTENING'});
      message.channel.send("**:white_check_mark: | The Listening Status Has Been Changed To : ``"
   + `${argresult}` + "``**")
  } else 
  if (message.content.startsWith(adminprefix + 'st')) {
    client.user.setGame(argresult, "https://www.twitch.tv/i_kahrba999");
      message.channel.send("**:white_check_mark: | The Streaming Status Has Been Changed To : ``"
   + `${argresult}` + "``**")
  }
  if (message.content.startsWith(adminprefix + 'setname')) {
  client.user.setUsername(argresult).then
      message.channel.send(`Changing The Name To ..**${argresult}** `)
} else
if (message.content.startsWith(adminprefix + 'setavatar')) {
  client.user.setAvatar(argresult);
    message.channel.send(`Changing The Avatar To :**${argresult}** `);
}
});


client.on('message',async message => {
  if(message.content.startsWith("#voice")) {
  if(!message.guild.member(message.author).hasPermissions('MANAGE_CHANNELS')) return message.reply('❌ **ليس لديك الصلاحيات الكافية**');
  if(!message.guild.member(client.user).hasPermissions(['MANAGE_CHANNELS','MANAGE_ROLES_OR_PERMISSIONS'])) return message.reply('❌ **ليس معي الصلاحيات الكافية**');
  message.channel.send('**تم عمل الروم بنجاح**');
  message.guild.createChannel(`Voice Online : [ ${message.guild.members.filter(m => m.voiceChannel).size} ]` , 'voice').then(c => {
    console.log(`Voice online channel setup for guild: \n ${message.guild.name}`);
    c.overwritePermissions(message.guild.id, {
      CONNECT: false,
      SPEAK: false
    });
    setInterval(() => {
      c.setName(`Voice Online : [ ${message.guild.members.filter(m => m.voiceChannel).size} ]`)
    },1000);
  });
  }
});

var voiceonline = require ("./voiceonline.json");
client.on ("message", async (message) => {
    if (!message.guild || message.author.bot) return false;
    if (message.content.startsWith(prefix + "setvc")) {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("**You need `MANAGE CHANNELS` Permissions to execute this command.**");
        var onlines = message.guild.members.filter (m => m.voiceChannel).size;
        message.guild.createChannel((`Voice Online [${onlines}]`), "voice").then(async (voice) => {
            voiceonline[message.guild.id] = {
                "ch": voice.id,
                "onoff": "On"
            };
            saveVoiceOnline ();
            message.channel.send("**Successfully created voiceonline **")
        })
    }
}) 
      
   client.on("message", message => {
     if(message.author.bot) return;
  if(message.content.startsWith(prefix + "togglevoice")) {
  if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_CHANNELS`' );
  if(!voiceonline[message.guild.id]) voiceonline[message.guild.id] = {
    "onoff": "Off"
  } 
    
    if(voiceonline[message.guild.id].onoff === 'Off') return [message.channel.send(`**The Voice Online Is On Now**`), voiceonline[message.guild.id].onoff = 'On']
    if(voiceonline[message.guild.id].onoff === 'On') return [message.channel.send(`**The Voice Online Is Off Now**`), voiceonline[message.guild.id].onoff = 'Off']
    saveVoiceOnline() 
  }
}) 

client.on ("voiceStateUpdate", async (old, neww) => {
  
  if (voiceonline[old.guild.id].onoff === 'On') {
    var channel = neww.guild.channels.get(voiceonline[old.guild.id].ch);
  channel.setName(`Voice Online [${old.guild.members.filter(m => m.voiceChannel).size}]`)
    if (voiceonline[old.guild.id].onoff === 'Off') {
      return;
  }}
})

function saveVoiceOnline() {
    fs.writeFileSync("./voiceonline.json", JSON.stringify(voiceonline, null, 4))
}






client.on("message", message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + "clear")) {
    if (!message.channel.guild)
      return message.reply("⛔ | This Command For Servers Only!");
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "⛔ | You dont have **MANAGE_MESSAGES** Permission!"
      );
    if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "⛔ | I dont have **MANAGE_MESSAGES** Permission!"
      );
    let args = message.content.split(" ").slice(1);
    let messagecount = parseInt(args);
    if (args > 99)
      return message
        .reply("**🛑 || يجب ان يكون عدد المسح أقل من 100 .**")
        .then(messages => messages.delete(5000));
    if (!messagecount) args = "100";
    message.channel
      .fetchMessages({ limit: messagecount + 1 })
      .then(messages => message.channel.bulkDelete(messages));
    message.channel
      .send(
        `\`${args}\`** : __عدد الرسائل التي تم مسحها __ **`
      )
      .then(messages => messages.delete(5000));
  }
});