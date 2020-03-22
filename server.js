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
const youtube = new YouTube('AIzaSyC-cxrwR4E2lizvODfupRtCIFht7taB_FM');
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
  if(message.content.startsWith("-voice")) {
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



client.on("message", async msg => {
  if (msg.author.bot) return undefined;
  if (!msg.content.startsWith(prefix)) return undefined;
  const args = msg.content.split(" ");
  const searchString = args.slice(1).join(" ");
  const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
  const serverQueue = queue.get(msg.guild.id);
  let command = msg.content.toLowerCase().split(" ")[0];
  command = command.slice(prefix.length);
  if (command === `play`) {
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel) return msg.channel.send("**YOU MUST IN VOICE CHAANEL**");
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT")) {
      return msg.channel.send("*Im Not Have a Permissions**");
    }
    if (!permissions.has("SPEAK")) {
      return msg.channel.send("**Im Not Have a Permissions**");
    }

    if (!permissions.has("EMBED_LINKS")) {
      return msg.channel.sendMessage("**`EMBED LINKS Must be Permissions **");
    }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();

      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id);
        await handleVideo(video2, msg, voiceChannel, true);
      }
      return msg.channel.send(
        ` **${playlist.title}**** <a:overify:688707812225712152>Added in list**`
      );
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(searchString, 5);
          let index = 0;
          const embed1 = new Discord.RichEmbed()
            .setDescription(
              `**Please Choose a Video** :
${videos.map(video2 => `[**${++index} **] \`${video2.title}\``).join("\n")}`
            )

            .setFooter("UltraBot");
          msg.channel.sendEmbed(embed1).then(message => {
            message.delete(20000);
          });

          try {
            var response = await msg.channel.awaitMessages(
              msg2 => msg2.content > 0 && msg2.content < 11,
              {
                maxMatches: 1,
                time: 15000,
                errors: ["time"]
              }
            );
          } catch (err) {
            console.error(err);
            return msg.channel.send("**No track was selected**");
          }
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
          console.error(err);
          return msg.channel.send("**:X: No search results available** ");
        }
      }

      return handleVideo(video, msg, voiceChannel);
    }
  } else if (command === `skip`) {
    if (!msg.member.voiceChannel)
      return msg.channel.send("**You are not an VoiceChannel**.");
    if (!serverQueue) return msg.channel.send("**There is no clip to skip it**");
    serverQueue.connection.dispatcher.end("Skpied<a:overify:688707812225712152>");
    return undefined;
  } else if (command === `stop`) {
    if (!msg.member.voiceChannel)
      return msg.channel.send("You are not an VoiceChannel .");
    if (!serverQueue) return msg.channel.send("**No clip to stop**");
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end("تم إيقاف المقطع<a:overify:688707812225712152>");
    return undefined;
  } else if (command === `vol`) {
    if (!msg.member.voiceChannel)
      return msg.channel.send("**You are not an VoiceChannel **.");
    if (!serverQueue) return msg.channel.send("**There is nothing operational.**");
    if (!args[1])
      return msg.channel.send(
        `:loud_sound: **Sound level** **${serverQueue.volume}**`
      );
    serverQueue.volume = args[1];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 50);
    return msg.channel.send(`:speaker: <a:overify:688707812225712152> **${args[1]}**`);
  } else if (command === `np`) {
    if (!serverQueue) return msg.channel.send("**There is nothing current to do.**");
    const embedNP = new Discord.RichEmbed().setDescription(
      `:notes: الان يتم تشغيل : **${serverQueue.songs[0].title}**`
    );
    return msg.channel.sendEmbed(embedNP);
  } else if (command === `queue`) {
    if (!serverQueue) return msg.channel.send("**There is nothing current to do**.");
    let index = 0;

    const embedqu = new Discord.RichEmbed().setDescription(`**Songs Queue**
${serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join("\n")}
**الان يتم تشغيل** ${serverQueue.songs[0].title}`);
    return msg.channel.sendEmbed(embedqu);
  } else if (command === `pause`) {
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      return msg.channel.send("**Stoped The Music<a:overify:688707812225712152>ا**!");
    }
    return msg.channel.send("**There is nothing current to do**");
  } else if (command === "resume") {
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return msg.channel.send("**Music resumed for you!**");
    }
    return msg.channel.send("**There is nothing current to do**");
  }

  return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
  const serverQueue = queue.get(msg.guild.id);
  console.log(video);

  //	console.log('yao: ' + Util.escapeMarkdown(video.thumbnailUrl));
  const song = {
    id: video.id,
    title: Util.escapeMarkdown(video.title),
    url: `https://www.youtube.com/watch?v=${video.id}`
  };
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: msg.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };
    queue.set(msg.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(msg.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      queue.delete(msg.guild.id);
      return msg.channel.send(`**I can't Join**${error}`);
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    if (playlist) return undefined;
    else
      return msg.channel.send(
        ` **${song.title}****<a:overify:688707812225712152> Added in Song List!**`
      );
  }
  return undefined;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  console.log(serverQueue.songs);

  const dispatcher = serverQueue.connection
    .playStream(ytdl(song.url))
    .on("end", reason => {
      if (reason === "Stream is not generating quickly enough.")
        console.log("Song ended.");
      else console.log(reason);
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  serverQueue.textChannel.send(`Start: **${song.title}**`);
}

client.on("message", message => {
const adminprefix = "-";
  var argresult = message.content
    .split(` `)
    .slice(1)
    .join(" ");
  if (!devs.includes(message.author.id)) return;

  if (message.content.startsWith(adminprefix + "setname")) {
    client.user.setUsername(argresult).then;
    message.channel.sendMessage(`**${argresult}** :<a:overify:688707812225712152> تم تغيير أسم البوت إلى`);
    return message.reply(
      "**لا يمكنك تغيير الاسم يجب عليك الانتظآر لمدة ساعتين . **"
    );
  } else if (message.content.startsWith(adminprefix + "setavatar")) {
    client.user.setAvatar(argresult);
    message.channel.sendMessage(`**${argresult}** : <a:overify:688707812225712152>تم تغير صورة البوت`);
  }
})
