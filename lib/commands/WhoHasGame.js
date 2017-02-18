/**
 * Created by Andrew Toomey on 2/2/2017.
 */
const Discord = require('discord.js');
let Clapp = require('../modules/clapp-discord/index');
let util = require('util');
let fs = require('fs');

let OWNED_GAMES_URL = "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=2E811A39C01C24BCBAE93B150282A1DB&steamid=%d&include_appinfo=1&format=json";

let PREZ_LEAGUE_MEMBERS = ["Fuzzy", "OldHickory" , "Franklin" , "Teddy", "Ulysses", "Adam" , "Hughes" ,"The_Dubyah" , "Taft" , "Bill" , "Stanley" , "Tyler" , "Mikey"];

module.exports = new Clapp.Command({
  name: "WhoHas",
  desc: "Checks to see what members of the Prez League own the game passed in",
  fn: (argv, context) => {
    let desiredGame = context.msg.content.split([' ']);
    desiredGame.shift();
    desiredGame.shift();
    let desiredGameString = desiredGame.join('');
    let userGameData;
    let usersWithGame = [];
    for (let prez in PREZ_LEAGUE_MEMBERS){
      userGameData = JSON.parse(fs.readFileSync(util.format('lib/modules/PrezLeagueGamesFiles/%sGames.json', PREZ_LEAGUE_MEMBERS[prez])));
      for (let game in userGameData.response.games) {
        let name = userGameData.response.games[game].name.replace(/\s/g, '');
        if (name.toUpperCase() == desiredGameString.toUpperCase()){
          usersWithGame.push(PREZ_LEAGUE_MEMBERS[prez]);
          break;
        }
      }
    }
    context.msg.reply(util.format("The following users have %s: %s", desiredGameString, usersWithGame.toString()));
  }
});

