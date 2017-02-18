/**
 * Created by andrewtoomey on 2/15/17.
 */
const Discord = require('discord.js');
let Clapp = require('../modules/clapp-discord/index');
let fs = require('fs');
let util = require('util');
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
  name: "FlagQuizAnswer",
  desc: "Answers a Flag Quiz Game",
  args: [
  {
    name: 'AreaCode',
    desc: 'the code of the area (0 - 5)',
    type: 'number',
    required: true,
    default: 0
  },
  {
    name: 'CountryCode',
    desc: 'the code of the country',
    type: 'number',
    required: true,
    default: 0,
  },
    {
      name: 'Answer',
      desc: 'your answer',
      type: 'string',
      required: true,
      default: '0',
    }
],
  fn: (argv, context) => {
    let Flags = [fs.readdirSync("Flags/Africa"),fs.readdirSync("Flags/Asia"),fs.readdirSync("Flags/Europe"),
      fs.readdirSync("Flags/North_America"),fs.readdirSync("Flags/Oceania"),fs.readdirSync("Flags/South_America")];

    let area = argv.args.AreaCode;
    let country = argv.args.CountryCode;
    let answer = argv.args.Answer;
    let correctAnswer = Flags[area][country].substring(Flags[area][country].indexOf('-') + 1,Flags[area][country].indexOf('.'));
    correctAnswer = correctAnswer.replace(/[_]/g, ' ');
    if (answer == correctAnswer) {
      context.msg.reply('You are Correct!');
      incrementTriviaText(context, 2);
    } else {
      context.msg.reply("Wrong! The correct answer is " + correctAnswer);
      incrementTriviaText(context, 0);
    }


  }
});
