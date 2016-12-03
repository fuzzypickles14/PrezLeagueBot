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

module.exports = new Clapp.Command({
  name: "PlayYTFull",
  desc: "Plays the full audio of a youtube video",
  args: [
    {
      name: 'Video handler',
      desc: 'the part in the youtube url after the v=',
      type: 'string',
      required: true,
      default: 'Video handler is not defined'
    }
  ],
  fn: (argv, context) => {
    const channels = context.msg.client.voice.client.channels;
    let video = 'https://www.youtube.com/watch?v=' + context.msg.content.split(' ')[2];
    let channel;
    for (let c of channels) {
      channel = c;
      if (channel[1] instanceof Discord.VoiceChannel) {
        if (channel[1].members.first() != null && userInChannel(channel[1].members, context.msg.author)) {
          channel[1].join().then(connection =>
          {
            const stream = ytdl(video, {filter : 'audioonly'});
            const player = connection.playStream(stream, { volume: .5});
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
