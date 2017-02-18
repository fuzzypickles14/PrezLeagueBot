/**
 * Created by Andrew Toomey on 12/2/2016.
 */
let Clapp = require('../modules/clapp-discord/index');
const cfg     = require('../../config.js');

module.exports = new Clapp.Command({
  name: "PostNSFW",
  desc: "Posts a text message that deletes itself after 10 seconds",
  args: [
    {
      name: 'Message',
      desc: 'the message you would like to send',
      type: 'string',
      required: true,
      default: 'There is no message',

    }
  ],
  fn: (argv, context) => {
    context.msg.reply(context.msg.content.split(' ')[2]).then(bot_response =>{
    if (cfg.deleteAfterReply.enabled) {
      context.msg.delete(cfg.deleteAfterReply.time)
        .then(msg => console.log(`Deleted message from ${msg.author}`))
        .catch(console.log);
      bot_response.delete(cfg.deleteAfterReply.time)
        .then(msg => console.log(`Deleted message from ${msg.author}`))
        .catch(console.log);
    }
    });
  }
});
