const preloadWarmup = function preloadWarmup() {

    return {

        initialize: function (){

            global.utilities.preloadWarmup.loadBotRegistry(true);
            global.utilities.preloadWarmup.loadMemberObjects(true);
            global.utilities.preloadWarmup.loadFactionObjects(true);
            global.utilities.preloadWarmup.loadUsers(true);
            global.utilities.preloadWarmup.loadAllWar(true);
            global.utilities.preloadWarmup.loadBlacklistedAPI(true);
            global.utilities.preloadWarmup.loadAllSettings(true);
            global.utilities.preloadWarmup.loadAllCache(true);



            setInterval(global.utilities.preloadWarmup.repeat,120000);
            setInterval(global.utilities.preloadWarmup.heavyRepeat,600000);


        },

        loadAllSettings: function (showConsole = false){

            global.utilities.preloadWarmup.loadRoleByFaction(showConsole);
            global.utilities.preloadWarmup.loadRoleForFactions(showConsole);
            global.utilities.preloadWarmup.loadVerifiedRoles(showConsole);

        },

        loadAllCache: function (showConsole = false){

            global.utilities.preloadWarmup.loadChannelNames(showConsole);
            global.utilities.preloadWarmup.loadGuildRoles(showConsole);

        },

        loadAllWar: function (showConsole = false){

            global.utilities.preloadWarmup.loadWarMonitor(showConsole);
            global.utilities.preloadWarmup.loadGAAssociation(showConsole);
            global.utilities.preloadWarmup.loadWarParticipants(showConsole);
            global.utilities.preloadWarmup.loadWarAgainst(showConsole);


        },

        repeat: function (){

            global.utilities.preloadWarmup.loadBotRegistry();

            global.utilities.preloadWarmup.loadAllWar();


        },

        heavyRepeat: function (){

            global.utilities.preloadWarmup.loadMemberObjects();
            global.utilities.preloadWarmup.loadBlacklistedAPI();
            global.utilities.preloadWarmup.loadUsers();

        },

        //Load all Blacklisted API Keys

        loadBlacklistedAPI: function (showConsole = false){

            global.utilities.mysqlFunctions.open;

            global.mysqlCon.query("SELECT apikey FROM blacklistedapikeys", function (err, result, fields) {
                if (err) throw err;

                global.utilities.preloadWarmup.setBlacklistedAPI(result,showConsole);


            });

            global.utilities.mysqlFunctions.close;

        },




        setBlacklistedAPI: function (result,showConsole){

            global.db.blacklistapi = global.utilities.mysqlFunctions.sortArray(result);

            if(showConsole){

                global.logger.info("-- Blacklisted API Keys Loaded: "+global.db.blacklistapi.length);

            }



        },
//Load all member objects

        loadFactionObjects: function (showConsole = false){

            global.utilities.mysqlFunctions.open;

            global.mysqlCon.query("SELECT faction_id,faction_name,leader,co_leader,age,respect,best_chain FROM factionobjects", function (err, result, fields) {
                if (err) throw err;

                global.utilities.preloadWarmup.setFactionObjects(result,showConsole);


            });

            global.utilities.mysqlFunctions.close;

        },




        setFactionObjects: function (result,showConsole){

            global.db.factionObjects = global.utilities.mysqlFunctions.sortArray(result);

            if(showConsole){

                global.logger.info("-- Faction Objects Loaded: "+global.db.factionObjects.length);

            }



        },
        //Load all member objects

        loadMemberObjects: function (showConsole = false){

            global.utilities.mysqlFunctions.open;

            global.mysqlCon.query("SELECT player_id,name,faction_id,position,discordid FROM memberobjects", function (err, result, fields) {
                if (err) throw err;

                global.utilities.preloadWarmup.setMemberObjects(result,showConsole);


            });

            global.utilities.mysqlFunctions.close;

        },




        setMemberObjects: function (result,showConsole){

            global.db.memberObjects = global.utilities.mysqlFunctions.sortArray(result);

            if(showConsole){

                global.logger.info("-- Member Objects Loaded: "+global.db.memberObjects.length);

            }



        },

        // Load all Users of TornApps

        loadUsers: function (showConsole = false){

            global.utilities.mysqlFunctions.open;

            global.mysqlCon.query("SELECT username,player_id,apikey,apivalid,faction_id FROM users", function (err, result, fields) {
                if (err) throw err;

                global.utilities.preloadWarmup.setUsers(result,showConsole);


            });

            global.utilities.mysqlFunctions.close;

        },




        setUsers: function (result,showConsole){

            global.db.users = global.utilities.mysqlFunctions.sortArray(result);

            if(showConsole){

                global.logger.info("-- User Objects Loaded: "+global.db.users.length);

            }



        },


        //Registry-related Functions:

        loadBotRegistry: function (showConsole = false){

            global.utilities.mysqlFunctions.open;

            global.mysqlCon.query("SELECT * FROM bot_registered", function (err, result, fields) {
                if (err) throw err;

                global.utilities.preloadWarmup.setBotRegistry(result,showConsole);


            });

            global.utilities.mysqlFunctions.close;

        },




        setBotRegistry: function (result,showConsole){

            global.db.registry = global.utilities.mysqlFunctions.sortArray(result);


            if(showConsole) {

                global.logger.info("-- Registry Loaded: "+global.db.registry.length);
            }


        },


        //Discord Settings Section:

        loadRoleByFaction: function (showConsole = false){

            global.utilities.mysqlFunctions.open;

            global.mysqlCon.query("SELECT * FROM bot_rolebyfaction", function (err, result, fields) {
                if (err) throw err;

                global.utilities.preloadWarmup.setRoleByFaction(result,showConsole);


            });

            global.utilities.mysqlFunctions.close;

        },




        setRoleByFaction: function (result,showConsole){

            global.db.settings.rolebyfaction = global.utilities.mysqlFunctions.sortArray(result);


            if(showConsole) {

                global.logger.info("--- Role By Faction Loaded: "+global.db.settings.rolebyfaction.length);
            }


        },

        loadRoleForFactions: function (showConsole = false){

            global.utilities.mysqlFunctions.open;

            global.mysqlCon.query("SELECT * FROM bot_roleforfactions", function (err, result, fields) {
                if (err) throw err;

                global.utilities.preloadWarmup.setRoleForFactions(result,showConsole);


            });

            global.utilities.mysqlFunctions.close;

        },




        setRoleForFactions: function (result,showConsole){

            global.db.settings.roleforfaction = global.utilities.mysqlFunctions.sortArray(result);


            if(showConsole) {

                global.logger.info("--- Role For Factions Loaded: "+global.db.settings.roleforfaction.length);
            }


        },

        loadVerifiedRoles: function (showConsole = false){

            global.utilities.mysqlFunctions.open;

            global.mysqlCon.query("SELECT * FROM bot_verifiedroles", function (err, result, fields) {
                if (err) throw err;

                global.utilities.preloadWarmup.setVerifiedRoles(result,showConsole);


            });

            global.utilities.mysqlFunctions.close;

        },




        setVerifiedRoles: function (result,showConsole){

            global.db.settings.verifiedroles = global.utilities.mysqlFunctions.sortArray(result);


            if(showConsole) {

                global.logger.info("--- Verified Roles Loaded: "+global.db.settings.verifiedroles.length);
            }


        },

        //Cached Discord Data

        loadChannelNames: function (showConsole = false){

            global.utilities.mysqlFunctions.open;

            global.mysqlCon.query("SELECT * FROM bot_channelnames", function (err, result, fields) {
                if (err) throw err;

                global.utilities.preloadWarmup.setChannelNames(result,showConsole);


            });

            global.utilities.mysqlFunctions.close;

        },




        setChannelNames: function (result,showConsole){

            global.db.guildcache.channels = global.utilities.mysqlFunctions.sortArray(result);


            if(showConsole) {

                global.logger.info("--- Channel Names Loaded: "+global.db.guildcache.channels.length);
            }


        },

        loadGuildRoles: function (showConsole = false){

            global.utilities.mysqlFunctions.open;

            global.mysqlCon.query("SELECT * FROM bot_guildroles", function (err, result, fields) {
                if (err) throw err;

                global.utilities.preloadWarmup.setGuildRoles(result,showConsole);


            });

            global.utilities.mysqlFunctions.close;

        },




        setGuildRoles: function (result,showConsole){

            global.db.guildcache.roles = global.utilities.mysqlFunctions.sortArray(result);


            if(showConsole) {

                global.logger.info("--- Roles Loaded: "+global.db.guildcache.roles.length);
            }


        },

        // War Database Functions

        loadWarMonitor: function (showConsole = false){

            global.utilities.mysqlFunctions.open;

            global.mysqlCon.query("SELECT * FROM bot_warmonitor", function (err, result, fields) {
                if (err) throw err;

                global.utilities.preloadWarmup.setWarMonitor(result,showConsole);


            });

            global.utilities.mysqlFunctions.close;

        },




        setWarMonitor: function (result,showConsole){

            global.track.wars.monitor = global.utilities.mysqlFunctions.sortArray(result);

            if(showConsole) {
                global.logger.info("-- War Monitor Loaded: " + global.track.wars.monitor.length);
            }


        },



        loadGAAssociation: function (showConsole = false){

            global.utilities.mysqlFunctions.open;

            global.mysqlCon.query("SELECT * FROM bot_gafactionassoc", function (err, result, fields) {
                if (err) throw err;

                global.utilities.preloadWarmup.setGAAssociation(result,showConsole);


            });

            global.utilities.mysqlFunctions.close;

        },




        setGAAssociation: function (result,showConsole){

            global.track.wars.gafactionassoc = global.utilities.mysqlFunctions.sortArray(result);


            if(showConsole) {

                global.logger.info("-- GA Faction Association Loaded: "+global.track.wars.gafactionassoc.length);
            }


        },

        loadWarAgainst: function (showConsole = false){

            global.utilities.mysqlFunctions.open;

            global.mysqlCon.query("SELECT * FROM bot_waragainst", function (err, result, fields) {
                if (err) throw err;

                global.utilities.preloadWarmup.setWarAgainst(result,showConsole);


            });

            global.utilities.mysqlFunctions.close;

        },




        setWarAgainst: function (result,showConsole){

            global.track.wars.waragainst = global.utilities.mysqlFunctions.sortArray(result);


            if(showConsole) {

                global.logger.info("-- War Against Loaded: "+global.track.wars.waragainst.length);
            }


        },

        loadWarParticipants: function (showConsole = false){

            global.utilities.mysqlFunctions.open;

            global.mysqlCon.query("SELECT * FROM bot_warparticipants", function (err, result, fields) {
                if (err) throw err;

                global.utilities.preloadWarmup.setWarParticipants(result,showConsole);


            });

            global.utilities.mysqlFunctions.close;

        },




        setWarParticipants: function (result,showConsole){

            global.track.wars.participants = global.utilities.mysqlFunctions.sortArray(result);


            if(showConsole) {

                global.logger.info("-- War Participants Loaded: "+global.track.wars.participants.length);
            }


        }

    }

}

module.exports = preloadWarmup();