const register = function register() {

    return {


        preRegister: function (control){


            if(global.tornApps.authFunctions.checkIfInMemberObjects(control.msg.author.id)){


                if(global.tornApps.authFunctions.returnRegisteredID(control) === false){

                    if(global.tornApps.authFunctions.checkIfRegisteredTornAppsUser(control)){

                        if(global.tornApps.authFunctions.checkIfLeaderByControl(control)) {

                            global.tornApps.register.addNewUnactiveGuildRegister(control);

                        }else{

                            global.objects.formattedMessage.systemLocalFailThenDelete(control,"Register Failed","You are not a Leader or Co-Leader of your faction.",false);

                        }



                    }else{

                        global.objects.formattedMessage.systemLocalFailThenDelete(control,"Register Failed","You are not a member of TornApps. First make an account at https://tornapps.com .",false);

                    }

                }


            }else{

                global.objects.formattedMessage.systemLocalFailThenDelete(control,"Register Failed","You are not in the TornApps system. Please register at https://tornapps.com to proceed.",false);

            }


        },

        addNewUnactiveGuildRegister: function (control){

            var guildID = control.msg.guild.id;
            var guildName = control.msg.guild.name;
            var admin = control.msg.author.id;
            var faction = global.tornApps.authFunctions.returnFactionIDByControl(control);


            var query;

            query = "INSERT INTO bot_registered (guild, server_name, factionid, adminone,activated,allowga,prefix,groupalertsroom,allownonwarga,adminchannel) VALUES ('"+guildID+"','"+guildName+"',"+faction+",'"+admin+"',0,0,'!','0',0,'0');";

            try {


                global.utilities.mysqlFunctions.open();
                global.mysqlCon.query(query, function (error, result, fields) {

                    if(error) throw error;

                    global.objects.formattedMessage.systemLocalSuccessThenDelete(control,"Register Complete!","Your Tappsy Bot is now registered, but not active. Finish activating by adding the Tappsy Discord Bot app in https://tornapps.com . After activating, type !refresh",false);

                });

            }
            catch (err){
                global.logger.error(err);
            }

            global.utilities.preloadWarmup.loadBotRegistry(false);

        },

        syncChannels: function (chanArray,guildID){

            try {


                var queryClear = "DELETE FROM bot_channelnames WHERE guildid='" + guildID + "';"
                global.utilities.mysqlFunctions.open();
                global.mysqlCon.query(queryClear, function (error, result, fields) {

                    if(error) throw global.logger.error(error);


                })

            }catch (err){
                global.logger.error(err);
            }

            for(var i in chanArray){

                var channelid = chanArray[i].id;
                var channelname = chanArray[i].name;

                var query = "REPLACE INTO bot_channelnames (channelid,guildid,channelname) VALUES('"+channelid+"','"+guildID+"','"+channelname+"');";

                try {




                    global.utilities.mysqlFunctions.open();
                    global.mysqlCon.query(query, function (error, result, fields) {

                        if(error) throw global.logger.error(error);


                    });


                }
                catch (err){
                    global.logger.error(err);
                }

            }

            global.utilities.preloadWarmup.loadChannelNames(false);


        },

        syncRoles: function (roles,guildID){

            try {


                var queryClear = "DELETE FROM bot_guildroles WHERE guildid='" + guildID + "';";

                global.utilities.mysqlFunctions.open();
                global.mysqlCon.query(queryClear, function (error, result, fields) {

                    if(error) throw global.logger.error(error);


                });

            }catch (err){
                global.logger.error(err);

            }
            for(var i in roles){

                var id = roles[i].id;
                var roleName = roles[i].name;

                if(roleName !== "@everyone"){

                    var query = "REPLACE INTO bot_guildroles (roleid,rolename,guildid) VALUES('"+id+"',"+global.mysqlCon.escape(roleName)+",'"+guildID+"');";

                    try {




                        global.utilities.mysqlFunctions.open();
                        global.mysqlCon.query(query, function (error, result, fields) {

                            if(error) throw global.logger.error(error);


                        });

                    }
                    catch (err){
                        global.logger.error(err);
                    }

                }

            }

            global.utilities.preloadWarmup.loadGuildRoles(false);

        }

    }

}

module.exports = register();