/**
 * Created by Andrew Toomey on 12/4/2016.
 */
const Discord = require('discord.js');
let Clapp = require('../modules/clapp-discord/index');
let fs = require('fs');
let triviaText = fs.readFileSync('lib/modules/trivia/trivia.json');


module.exports = new Clapp.Command({
  name: "StartTrivia",
  desc: "Plays a trivia game",
  fn: (argv, context) => {
    let trivia = JSON.parse(triviaText);
    let questionNumber = Math.floor((Math.random() * 50) + 1);
  }
});
