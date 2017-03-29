/**
 * Created by andrewtoomey on 3/29/17.
 */
const Discord = require('discord.js');
let Clapp = require('../modules/clapp-discord/index');
let SyncVidUrl = "https://www.sync-youtube.com/watch?v=%s";
let util = require('util');


module.exports = new Clapp.Command({
  name: "SyncVid",
  desc: "Creates a Sync-vid room for the provided video",args: [
    {
      name: 'VideoHandler',
      desc: 'The part after the video',
      type: 'string',
      required: true,
      default: "asdf",

    }],
  fn: (argv, context) => {
    context.msg.reply(util.format(SyncVidUrl, argv.args.VideoHandler));
  }

});
