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


module.exports = new Clapp.Command({
  name: "StartTrivia",
  desc: "Plays a trivia game",
  fn: (argv, context) => {
    let trivia = JSON.parse(triviaText);
    let questionNumber = Math.floor((Math.random() * 50) + 1);
    let question = trivia.results[questionNumber];
    let answerIndex = Math.floor((Math.random() * 4));
    let answers = [question.correct_answer, question.incorrect_answers[0], question.incorrect_answers[1], question.incorrect_answers[2]];
    shuffle(answers);
    context.msg.reply(util.format(questionFormat, questionNumber, question.question, answers[0], answers[1], answers[2], answers[3]));
  }
});
