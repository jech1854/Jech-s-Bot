const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const bot = new Discord.Client();
const PREFIX = botSettings.prefix;
const rbx = require('roblox-js');
const username = 'NFLRank';
const password = 'swag1854';
const group = 3054848;

rbx.login(username, password);


bot.on("ready", () =>{
console.log("bot logged in");
bot.user.setGame(`${botSettings.prefix}help | ${bot.guilds.size} guilds`);
});

bot.on("message", function (message) {
    if (message.author.equals(bot.user)) return;
 
    if (!message.content.startsWith(PREFIX)) return;

    

    var args = message.content.substring(PREFIX.length).split(" ")
    var newver;
   
    if (args[0].toLowerCase() === 'ping'){
        message.channel.send('Pong!');
    }
    else if (args[0].toLowerCase() === 'shout'){
        let Commander = message.guild.roles.find("name", "Bot Operator")
        if (!message.member.roles.has(Commander.id)) return message.reply('You are Not an Admin');
       // if (!message.member.hasPermissions('ADMINISTRATOR')) return message.reply('You are Not an Admin');
        newver = message.content.slice(7,message.content.length);
        Shout(newver);
        message.reply('**Shouted ' + newver + '**');
    }

    else if (args[0].toLowerCase() === 'rank'){
        let Commander = message.guild.roles.find("name", "Bot Operator")
        if (!message.member.roles.has(Commander.id)) return message.reply('You are Not an Admin');
      //  if (!message.member.hasPermissions('ADMINISTRATOR')) return message.reply('You are Not an Admin');
       var target = args[2];// passed as player usename(string)
        var a = message.content.slice(target,message.content.length);
        var b = a.indexOf(' ') +  1;
        var c = a.slice(b, message.content.length);
        var rank = c;
        console.log(rank);
        console.log(target);
        var d = rank.indexOf(' ');
        var cd = rank.slice(0,d);
        var eb = rank.slice(d+1,rank.length);
        target = cd;
        rank = eb;
        console.log('-------------');
        console.log(rank);
        console.log(target);
       

        var promise = rbx.getIdFromUsername(target);
        var promise2 = promise.then(function (data) {
            return SetRank(data,rank,target);
          }, function (err) {
            console.error(err); // if readFile was unsuccessful, let's log it but still readAnotherFile
            message.reply(err + ' **DM @Jech#4318 if you get this error.**');
            return;
          });
  
         
    }
    else if (args[0].toLowerCase() === 'getid'){
        let Commander = message.guild.roles.find("name", "Bot Operator")
        if (!message.member.roles.has(Commander.id)) return message.reply('You are Not an Admin');
        var d = message.content.indexOf(' ');
        var eb = message.content.slice(d+1,message.content.length);
        message.reply(eb + ' User ID Is: ' + rbx.getIdFromUsername(eb))
    }
    else if (args[0].toLowerCase() === 'joinrequests' ){
        let Commander = message.guild.roles.find("name", "Bot Operator")
        if (!message.member.roles.has(Commander.id)) return message.reply('You are Not an Admin');
        var Page1 = rbx.getJoinRequests(group);
        var PageT = Page1.then(function (data) {
            return;// message.reply('Here are the join requests.\n ' + data[requests][]);
          }, function (err) {
            console.error(err); // if readFile was unsuccessful, let's log it but still readAnotherFile
            message.reply(err + ' **DM @Jech#4318 if you get this error.**');
            return;
          });
  

    }






    function SetRank(tar,namee,tarname){
        var options = {group: group,
                       target: tar,
                       name: namee
                        }
           rbx.setRank(options).then(function (newRole) {
                console.log('The new role is: ' + JSON.stringify(newRole));
             message.reply('**' + tarname + ' now has the rank of ' + namee + '**');
             });
        }
});
 
function Shout(text){
    rbx.shout(group,text);
};



bot.login(process.env.BOT_TOKEN);
