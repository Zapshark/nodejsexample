"use strict";


global.fs = require('fs');
var DevelopmentMode = false;
try{

    DevelopmentMode = global.fs.existsSync('./devmode');

} catch (err){

    console.error(err);

}

//Set our important variables:
global.util = require("util");
if(DevelopmentMode===true){
    global.DiscordToken = '<DEV DISCORD HERE>';

}else {
    global.DiscordToken = '<LIVE DISCORD HERE>';
}


//Establish our third-party functions:
global.Discord = require('discord.js');
global.decodehtml = require('decode-html');
global.express = require('express');
global.client = new Discord.Client();
global.mysql = require('mysql');
global.async = require('async');
global.util = require('util');
global.http = require('http');
global.log4js = require('log4js');
global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;




if(DevelopmentMode===true) {
//Set up Express
    global.app = global.express();
    global.port = 2052;
    global.host = "127.0.0.1";

    //Set Config for Log4js
    log4js.configure({
        appenders: { tappsy: { type: 'fileSync', filename: 'devlog.log', maxLogSize: 10458760, backups: 3 },
            out: {
                type: 'stdout'
            }},


        categories: { default: { appenders: ['tappsy','out'], level: 'info' } }
    });
    global.mySQLCredentials = {
        host: "<IP ADDRESS HERE>",
        user: "<USER HERE>",
        password: "<PASSWORD HERE>",
        database: "<DATABASE HERE>",
        charset : 'utf8mb4'
    };

}else{

    global.app = global.express();
    global.port = 2052;
    global.host = "127.0.0.1";

    //Set Config for Log4js
    log4js.configure({
        appenders: { tappsy: { type: 'fileSync', filename: 'livelog.log', maxLogSize: 10458760, backups: 3 } },
        categories: { default: { appenders: ['tappsy'], level: 'info' } }
    });


    global.mySQLCredentials = {
        host: "<IP ADDRESS HERE>",
        user: "<USER HERE>",
        password: "<PASSWORD HERE>",
        database: "<DATABASE HERE>",
        charset : 'utf8mb4'
    };
}

global.logger = log4js.getLogger('tappsy');



//Set our global variables:
global.core  = [];
global.lib = [];
global.control = [];
global.mysqlCon = [];

lib.objects = [];

//Put above in global


//Load Library
global.tornAPI = require('./lib/api/torn.js');
global.tornStatsAPI = require('./lib/api/tornstats.js');
global.api = require('./lib/api.js');
global.tornApps = require('./lib/tornApps.js');
global.utilities = require('./lib/utilities.js');

//Load Objects
//lib.obj.statchanmessage = require('./lib/objects/statChanMessage.js');
global.objects = require('./lib/objects.js');

//Database
global.db = [];

//Bot Registry Data:
global.db.registry = [];

//Users Data:

global.db.users = [];

//Bot Members Data:
global.db.memberObjects = [];

//Bot Faction Data:
global.db.factionObjects = [];

//Blacklisted API Keys:
global.db.blacklistapi = [];

//Discord Settings
global.db.settings = [];
global.db.settings.rolebyfaction = [];
global.db.settings.roleforfaction = [];
global.db.settings.verifiedroles = [];
global.db.settings.verifyschedule = [];

//Discord Cached Data
global.db.guildcache = [];
global.db.guildcache.channels = [];
global.db.guildcache.roles = [];


//Discord-Specific Global Data:
global.guilds = [];
global.test = [];
global.prefix = [
    { name: '!' },
    { name: '$' },
    { name: '%' },
    { name: '#' },
    { name: '&' },
    { name: '^' }

];

global.prefix = prefix;

global.numericEmoji = ["0️⃣","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟","👨‍👨‍👧‍👦","👨‍👨‍👧‍👦","👨‍👨‍👧‍👦","👨‍👨‍👧‍👦","👨‍👨‍👧‍👦","👨‍👨‍👧‍👦"];

//Global Tracking Variables
global.track = [];
global.track.groupalerts = [];
global.track.groupalerts.byDefend = [];
global.track.wars = [];
global.track.wars.creating = [];
global.track.wars.active = [];
global.track.wars.monitor = [];
global.track.wars.participants = [];
global.track.wars.waragainst = [];
global.track.wars.gafactionassoc = [];





//Global Timer Variables
global.timers = [];


global.mysqlCon = global.mysql.createConnection(mySQLCredentials);


client.on('guildMemberAdd', member => {

   global.tornApps.verify.checkForDiscord(member.id,member);

});

client.on("message", function(msg) {


    if (msg.author.bot) return;


    var hasPrefix = global.prefix.filter(option => option.name.startsWith(msg.content.charAt(0)));
    if (!hasPrefix.length) return;

    var isPM = false;

    if(msg.channel.type === "dm"){
        isPM = true;
    }else{
        isPM = false;
    }
    if(isPM===false) {
        const guildID = msg.guild.id;
    }

    const commandBody = msg.content.slice(1);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    const argsNotSplit = msg.content.slice(command.length+2);

    global.control = controlWrapper(msg,command,args,argsNotSplit,client,mysqlCon);

    global.core.commands = require('./core/core.js');



    if(!isPM) {

        core.commands.register.sync(control);

        if (global.utilities.safetyChecks.guildIsRegistered(global.control)) {
            logger.info("R command: " + command + " args: " + argsNotSplit);
            core.commands.verify.verify(control);
            core.commands.test.test(control);

            core.commands.stats.mystats(control);

            if(global.tornApps.authFunctions.checkIfCanUseGA(control)) {
                core.commands.war.war(control);
            }

            core.commands.utilities.idassist(control);

            //core.testing.test(control);

        } else {

            logger.info("UR command: " + command + " args: " + argsNotSplit);

            core.commands.utilities.idassist(control);

        }
    }else{

        core.commands.war.warPM(control);

    }

});

function controlWrapper(msg,command,args,argsNotSplit,client,mysqlCon){

    var fullScope = {};
    fullScope.msg = msg;
    fullScope.command = command;
    fullScope.args = args;
    fullScope.argsNotSplit = argsNotSplit;
    fullScope.client = client;
    fullScope.mysqlCon = mysqlCon;
    fullScope.data = [];

    return fullScope;


}


//Discord Client-related Functions:
global.client.login(DiscordToken);

client.on('error', error => {
    logger.error('The WebSocket encountered an error:', error);
});

global.client.on('ready', ready => {

    //global.utilities.arrDeepAdd("id",2,"me","too",global.test);
console.log("Loaded");
    global.utilities.preloadWarmup.initialize();

    logger.info("- Discord Client Ready");





});

global.app.listen(global.port,global.host);
logger.info('Server started! At '+global.host+':' + global.port);

app.get('/', function (req, res) {
    res.send(req.params);
})

app.get('/botrefreshbytornapps', function (req, res) {

    global.utilities.preloadWarmup.loadAllSettings(false);
    global.utilities.preloadWarmup.loadAllCache(false);
    global.utilities.preloadWarmup.loadMemberObjects(false);

    res.send(req.params);
})

app.get('/ga/joined/:defenderID/:channelID', function (req, res) {

    var defenderID,channelID;

    if(req.params.defenderID !== ""){

        defenderID = req.params.defenderID;

        if(req.params.channelID !== ""){

            channelID = req.params.channelID;


            global.tornApps.war.joinIncreaseCount(defenderID);

            res.redirect('https://www.torn.com/loader.php?sid=attack&user2ID='+defenderID);

        }

    }

})

app.get('/ga/api/:apiKey/def/:defID', function (req, res) {


    if(req.params.apiKey !== ""){

        if(req.params.defID !== ""){

            //global.logger.error(req.params.apiKey + " " + req.params.defID);

            global.objects.warAttack.groupAssistRequest(req.params.apiKey,req.params.defID);

            res.send("Request Received.");

        }else{

            res.send("Error or Unauthorized attempt made.");

        }

    }else{

        res.send("You need to put your API Key in the script you downloaded.");

    }

})