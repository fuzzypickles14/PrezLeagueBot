/**
 * Created by Andrew Toomey on 12/2/2016.
 */
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
let Clapp = require('../modules/clapp-discord/index');


function userInChannel(memberList, authorName){
  for (let m of memberList) {
    if (authorName == m[1].user) {
      return true;
    }
  }
  return false;
}


let memes = {"JMvtXsU33z8": 25, "sc04xiqgeCw": -1, "MzvMG-BOdS0": -1, "5aopMm7UGYA": -1};

module.exports = new Clapp.Command({
  name: "RandomMeme",
  desc: "Plays a random Meme",
  fn: (argv, context) => {

    const channels = context.msg.client.voice.client.channels;
    let videoNum = (Math.random() * 4);
    let video = 'https://www.youtube.com/watch?v=' + memes[videoNum];
    let channel;
    for (let c of channels) {
      channel = c;
      if (channel[1] instanceof Discord.VoiceChannel) {
        if (channel[1].members.first() != null && userInChannel(channel[1].members, context.msg.author)) {
          channel[1].join().then(connection =>
          {
            const stream = ytdl(video, {filter : 'audioonly'});
            const player = connection.playStream(stream, { volume: volume});
            player.on('end', () => {
              channel[1].leave();
            });
          });
          break;
        }
      }
    }
  }
});

