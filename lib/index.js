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
         if (questionNumber.indexOf(' ') != -1) {
           app.parseInput(util.format('!plb FlagQuizAnswer %d %d %s', questionNumber.split(' ')[0], questionNumber.split(' ')[1], msg.content), {
             msg: msg
           });
         } else {
           app.parseInput(util.format('!plb AnswerTrivia %d %s', questionNumber, msg.content), {
             msg: msg
           });
         }
         questionNumber = -1;
         isTrivia = false;
       } else {
         let num = msg.content.match(/.\d+-\d+/g);
         if (!num) {
           num = msg.content.match(/.\d+:/g)
           questionNumber = num[0].substring(1, num[0].indexOf(':'));
           console.log(questionNumber);
         } else {
           questionNumber = num[0].substring(1);
           questionNumber = questionNumber.replace(/[-]/g, ' ');
           console.log(questionNumber);
         }
       }
     }
   }
});

bot.login(cfg.token).then(() => {
  console.log('Running!');
});
