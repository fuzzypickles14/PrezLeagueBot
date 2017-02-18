'use strict';

const fs      = require('fs');
const Clapp   = require('./modules/clapp-discord/index');
const cfg     = require('../config.js');
const pkg     = require('../package.json');
const Discord = require('discord.js');
const bot     = new Discord.Client();
let util = require('util');


let isTrivia = false;
let questionNumber = -1;

var app = new Clapp.App({
  name: cfg.name,
  desc: pkg.description,
  prefix: cfg.prefix,
  version: pkg.version,
  onReply: (msg, context) => {
    // Fired when input is needed to be shown to the user.
    context.msg.reply('\n' + msg).then(bot_response => {
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

// Load every command in the commands folder
fs.readdirSync('./lib/commands/').forEach(file => {
  app.addCommand(require("./commands/" + file));
});

bot.on('message', msg => {
   if (app.isCliSentence(msg.content)) {
    app.parseInput(msg.content, {
      msg: msg
    });
    isTrivia = msg.content.indexOf("Trivia") != -1;
  }
  else {
     if (isTrivia) {
       if (msg.content.indexOf('Question #') == -1) {
         app.parseInput(util.format('!plb AnswerTrivia %d %s', questionNumber, msg.content), {
           msg: msg
         });
         isTrivia = false;
       } else {
         questionNumber = msg.content.match(/.\d+/g)[1].substring(1);
         console.log(questionNumber);
       }
     }
   }
});

bot.login(cfg.token).then(() => {
  console.log('Running!');
});
