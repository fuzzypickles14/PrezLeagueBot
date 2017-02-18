/**
 * Created by Andrew Toomey on 12/4/2016.
 */
const Discord = require('discord.js');
let Clapp = require('../modules/clapp-discord/index');
let fs = require('fs');
let util = require('util');
let triviaText = fs.readFileSync('lib/modules/trivia/trivia.json');
let shuffle = require('shuffle-array');

let questionFormat = "Question #%d: %s\nA:%s\nB:%s\nC:%s\nD:%s\n";

function triviaQuestion(argv, context) {
  let trivia = JSON.parse(triviaText);
  let questionNumber = Math.floor((Math.random() * 50) + 1);
  let question = trivia.results[questionNumber];
  let answers = [question.correct_answer, question.incorrect_answers[0], question.incorrect_answers[1], question.incorrect_answers[2]];
  shuffle(answers);
  context.msg.reply(util.format(questionFormat, questionNumber, question.question, answers[0], answers[1], answers[2], answers[3]));
}

function flagQuestion(argv, context) {
  let Flags = [fs.readdirSync("Flags/Africa"),fs.readdirSync("Flags/Asia"),fs.readdirSync("Flags/Europe"),
    fs.readdirSync("Flags/North_America"),fs.readdirSync("Flags/Oceania"),fs.readdirSync("Flags/South_America")];
  let countryNum = Math.floor(Math.random() * 6);
  let country = Flags[countryNum];
  let flagNum = Math.floor(Math.random() * country.length);
  let flag = country[flagNum];
  delete country[flagNum];
  let falseFlag1 = country[Math.floor(Math.random() * country.length)];
  let falseFlag2 = country[Math.floor(Math.random() * country.length)];
  let falseFlag3 = country[Math.floor(Math.random() * country.length)];
  let flags = [flag, falseFlag1, falseFlag2, falseFlag3];
  try {
    flags = flags.map(function (x) {
      return x.substring(x.indexOf('-') + 1, x.indexOf('.'))
    });
    flags = flags.map(function (y) {
      return y.replace('_', ' ')
    });
  }catch(err){
    console.log(context.msg);
  }
  shuffle(flags);
  context.msg.channel.sendFile(util.format("Flags/%s/%s", flag.substring(0, flag.indexOf("-")), flag), "", util.format("Question #%d-%d: What Country's Flag is this???", countryNum, flagNum) +
    util.format("\nA: %s\nB: %s\nC: %s\nD: %s", flags[0], flags[1], flags[2], flags[3]));
}

module.exports = new Clapp.Command({
  name: "Trivia",
  desc: "Plays a trivia game",
  fn: (argv, context) => {
    if (Math.floor((Math.random() * 10) + 1) < 5) {
      triviaQuestion(argv, context);
    }else {
      flagQuestion(argv, context);
    }
  }
});
