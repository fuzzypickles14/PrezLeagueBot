/**
 * Created by Andrew Toomey on 12/4/2016.
 */
const Discord = require('discord.js');
let Clapp = require('../modules/clapp-discord/index');
let fs = require('fs');
let util = require('util');
let triviaText = fs.readFileSync('lib/modules/trivia/trivia.json');
let pointsText = fs.readFileSync('lib/modules/points/points.json');


function incrementTriviaText(context, amount) {
  let points = JSON.parse(pointsText);
  for( let i = 0; i < points.users.length; i++) {
    if (points.users[i].name == context.msg.author.username) {
      points.users[i].points += amount;
      context.msg.reply(util.format('You have gained %d points and have a total of %d points', amount, points.users[i].points));
      break;
    }
  }
  fs.writeFile('lib/modules/points/points.json', JSON.stringify(points));
}

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
      incrementTriviaText(context, 1);
    } else{
      context.msg.reply(util.format("Wrong!, the correct answer is %s", question.correct_answer));
      incrementTriviaText(context, 0);
    }

  }
});
