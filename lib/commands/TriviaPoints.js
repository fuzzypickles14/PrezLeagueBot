/**
 * Created by Andrew Toomey on 2/17/2017.
 */
const Discord = require('discord.js');
let Clapp = require('../modules/clapp-discord/index');
let fs = require('fs');
let util = require('util');
let extend = require('util')._extend;

module.exports = new Clapp.Command({
  name: "Points",
  desc: "Returns how many trivia points you have",
  fn: (argv, context) => {
    var pointsText = fs.readFileSync('lib/modules/points/points.json');
    var userDoesExist = false;
    let points = JSON.parse(pointsText);
    for( let i = 0; i < points.users.length; i++) {
      if (points.users[i].name == context.msg.author.username) {
        context.msg.reply(util.format('You have %d trivia points!', points.users[i].points));
        userDoesExist = true;
        break;
      }
    }
    if (!userDoesExist) {
      let newUser = extend({}, points.users[0]);
      newUser.name = context.msg.author.username;
      newUser.points = 0;
      points.users[points.users.length] = newUser;
      fs.writeFile('lib/modules/points/points.json', JSON.stringify(points))
      context.msg.reply(util.format('Welcome %s to the Trivia Game! You have %d trivia points!', newUser.name, newUser.points));
    }
  }
});
