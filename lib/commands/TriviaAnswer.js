/**
 * Created by Andrew Toomey on 12/4/2016.
 */
const Discord = require('discord.js');
let Clapp = require('../modules/clapp-discord/index');
let fs = require('fs');
let util = require('util');
let triviaText = fs.readFileSync('lib/modules/trivia/trivia.json');

module.exports = new Clapp.Command({
  name: "AnswerTrivia",
  desc: "Answers a trivia game",args: [
    {
      name: 'QuestionNumber',
      desc: 'The number question you are answering',
      type: 'number',
      required: true,
      default: -1,

    },
    {
      name: 'Answer',
      desc: 'The textual answer to the question you are given',
      type: 'string',
      required: true,
      default: 'This is the wrong answer',
    }
  ],
  fn: (argv, context) => {
    let trivia = JSON.parse(triviaText);
    let question = trivia.results[argv.args.QuestionNumber];
    let answer = argv.args.Answer;
    if (answer == question.correct_answer){
      context.msg.reply("You are Correct!");
    } else{
      context.msg.reply(util.format("Wrong!, the correct answer is %s", question.correct_answer));
    }

  }
});
