/**
 * Created by andrewtoomey on 2/15/17.
 */
const Discord = require('discord.js');
let Clapp = require('../modules/clapp-discord/index');
let fs = require('fs');
let util = require('util');
let sleep = require('sleep');
let shuffle = require('shuffle-array');


module.exports = new Clapp.Command({
  name: "FlagQuiz",
  desc: "Plays Flag Quiz Game",
  fn: (argv, context) => {
    let Flags = [fs.readdirSync("Flags/Africa"),fs.readdirSync("Flags/Asia"),fs.readdirSync("Flags/Europe"),
      fs.readdirSync("Flags/North_America"),fs.readdirSync("Flags/Oceania"),fs.readdirSync("Flags/South_America")];

    let countryNum = Math.floor(Math.random() * 6)
    let country = Flags[countryNum];
    let flagNum = Math.floor(Math.random() * country.length)
    let flag = country[flagNum];
    delete country[flagNum];
    let falseFlag1 = country[Math.floor(Math.random() * country.length)];
    let falseFlag2 = country[Math.floor(Math.random() * country.length)];
    let falseFlag3 = country[Math.floor(Math.random() * country.length)];
    let flags = [flag, falseFlag1, falseFlag2, falseFlag3];
    flags = flags.map(function(x) { return x.substring(x.indexOf('-') + 1, x.indexOf('.'))} );
    flags = flags.map(function(y) {return y.replace('_', ' ')});
    shuffle(flags);
    context.msg.channel.sendFile(util.format("Flags/%s/%s", flag.substring(0, flag.indexOf("-")), flag), "", "What Country's Flag is this???" +
      util.format("\nA: %s\nB: %s\nC: %s\nD: %s", flags[0], flags[1], flags[2], flags[3]) +
    util.format("\nArea: %d   Country: %d", countryNum, flagNum));
  }
});
