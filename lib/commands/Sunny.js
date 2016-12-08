/**
 * Created by Andrew Toomey on 12/1/2016.
 */
const Discord = require('discord.js');
let Clapp = require('../modules/clapp-discord/index');


function userInChannel(memberList, authorName){
  for (let m of memberList) {
    if (authorName == m[1].user) {
      return true;
    }
  }
  return false;
}

module.exports = new Clapp.Command({
  name: "Sunny",
  desc: "Plays the Always Sunny Intro",
  fn: (argv, context) => {
    const channels = context.msg.client.voice.client.channels;
    let channel;
    for (let c of channels) {
      channel = c;
      if (channel[1] instanceof Discord.VoiceChannel) {
        if (channel[1].members.first() != null && userInChannel(channel[1].members, context.msg.author)) {
          channel[1].join().then(connection =>
          {
            const player = connection.playFile('Sunny.mp3', { volume: .2});
            player.on('end', () => {
              channel[1].leave();
            })
          });
          break;
        }
      }
    }
  }
});
