/**
 * Created by andrewtoomey on 2/15/17.
 */
const Discord = require('discord.js');
let Clapp = require('../modules/clapp-discord/index');
let fs = require('fs');
module.exports = new Clapp.Command({
  name: "FlagQuizAnswer",
  desc: "Answers a Flag Quiz Game",
  args: [
  {
    name: 'Area Code',
    desc: 'the code of the area (0 - 5)',
    type: 'string',
    required: true,
    default: '0'
  },
  {
    name: 'Country Code',
    desc: 'the code of the country',
    type: 'string',
    required: true,
    default: '0',
  }
],
  fn: (argv, context) => {
    let Flags = [fs.readdirSync("Flags/Africa"),fs.readdirSync("Flags/Asia"),fs.readdirSync("Flags/Europe"),
      fs.readdirSync("Flags/North_America"),fs.readdirSync("Flags/Oceania"),fs.readdirSync("Flags/South_America")];

    let area = parseInt(context.msg.content.split(' ')[2]);
    let country = parseInt(context.msg.content.split(' ')[3]);

    context.msg.channel.sendMessage("The correct answer is " + Flags[area][country].substring(Flags[area][country].indexOf('-') + 1,Flags[area][country].indexOf('.') ));


  }
});
