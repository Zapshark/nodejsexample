const warAttack = function warAttack() {


    return {

        formatFromDataGroupAssist: function (data) {



            const messageEmbed = new global.Discord.MessageEmbed()
                .setColor(data.color)
                .setTitle(data.title)
                .setURL(data.url)
                .setDescription(data.description)
                .addField('Stat Spy', data.spy, true)
                .addField('Basic Info', data.basicInfo, true)
                .addField('Current Status', data.status, true)

                .setTimestamp()

            return messageEmbed;


        },

        initialGroupDataAssemble: function (resultAttackerTorn,resultDefenderTorn,resultTornStats,channelID){

            var info = [];
            info.AttackerName = resultAttackerTorn.name;
            info.AttackerID = resultAttackerTorn.player_id;
            info.AttackerFactionID = resultAttackerTorn.faction.faction_id;

            info.DefenderName = resultDefenderTorn.name;
            info.DefenderID = resultDefenderTorn.player_id;

            info.DefenderRank = resultDefenderTorn.rank;
            info.DefenderLevel = resultDefenderTorn.level;
            info.DefenderStatus = resultDefenderTorn.status.description;
            info.DefenderFactionName = resultDefenderTorn.faction.faction_name;
            info.DefenderFactionID = resultDefenderTorn.faction.faction_id;

            info.DefenderXanaxTaken = resultDefenderTorn.personalstats.xantaken;

            info.DefenderLastAction = resultDefenderTorn.last_action.status;

            info.DefenderOnlineStatus = "";

            if(info.DefenderLastAction === "Online"){

                info.DefenderOnlineStatus = " 🟢 ";

            }
            if(info.DefenderLastAction === "Offline"){

                info.DefenderOnlineStatus = " 🔴 ";

            }
            if(info.DefenderLastAction === "Idle"){

                info.DefenderOnlineStatus = " 🟡 ";

            }

            info.DefenderLife = resultDefenderTorn.life.current + "/" + resultDefenderTorn.life.maximum;

            if(resultTornStats !== false) {
                if (resultTornStats.spy.status === true) {

                    info.SpyResults =
                        "```Speed: " + global.utilities.format.formatNumbers(resultTornStats.spy.speed, 0, ".", ",") + "\n" +
                        "Strength: " + global.utilities.format.formatNumbers(resultTornStats.spy.strength, 0, ".", ",") + "\n" +
                        "Dexterity: " + global.utilities.format.formatNumbers(resultTornStats.spy.dexterity, 0, ".", ",") + "\n" +
                        "Defense: " + global.utilities.format.formatNumbers(resultTornStats.spy.defense, 0, ".", ",") + "\n" +
                        "Total: " + global.utilities.format.formatNumbers(resultTornStats.spy.total, 0, ".", ",") + "\n```"


                } else {
                    info.SpyResults = "None";
                }
            }else{
                info.SpyResults = "None";

            }


            var data = [];

            data.title = "[Join Group Attack]";
            data.description = info.AttackerName+" ["+info.AttackerID+"] has requested help with "+info.DefenderName+" ["+info.DefenderID+"]" + "\nFaction: "+info.DefenderFactionName;

            data.url = "https://tornapps.com/tappsy/gajoin/"+info.DefenderID+"/"+channelID;
            data.color = "#4c73c8";
            data.spy = info.SpyResults;
            data.status = info.DefenderOnlineStatus + info.DefenderStatus;
            data.basicInfo = "Level: "+info.DefenderLevel+"\nRank: "+info.DefenderRank+"\nHealth: "+info.DefenderLife+"\nXanax Taken: " + global.utilities.format.formatNumbers(info.DefenderXanaxTaken,0,".",",");

            return data;

        },

        initialWarGroupDataAssemble: function (resultAttackerTorn,resultDefenderTorn,resultTornStats,channelID){

            var info = [];
            info.AttackerName = resultAttackerTorn.name;
            info.AttackerID = resultAttackerTorn.player_id;
            info.AttackerFactionID = resultAttackerTorn.faction.faction_id;

            info.DefenderName = resultDefenderTorn.name;
            info.DefenderID = resultDefenderTorn.player_id;

            info.DefenderRank = resultDefenderTorn.rank;
            info.DefenderLevel = resultDefenderTorn.level;
            info.DefenderStatus = resultDefenderTorn.status.description;
            info.DefenderFactionName = resultDefenderTorn.faction.faction_name;
            info.DefenderFactionID = resultDefenderTorn.faction.faction_id;

            info.DefenderXanaxTaken = resultDefenderTorn.personalstats.xantaken;

            info.DefenderLastAction = resultDefenderTorn.last_action.status;

            info.DefenderOnlineStatus = "";

            if(info.DefenderLastAction === "Online"){

                info.DefenderOnlineStatus = " 🟢 ";

            }
            if(info.DefenderLastAction === "Offline"){

                info.DefenderOnlineStatus = " 🔴 ";

            }
            if(info.DefenderLastAction === "Idle"){

                info.DefenderOnlineStatus = " 🟡 ";

            }

            info.DefenderLife = resultDefenderTorn.life.current + "/" + resultDefenderTorn.life.maximum;

            if(resultTornStats !== false) {
                if (resultTornStats.spy.status === true) {

                    info.SpyResults =
                        "```Speed: " + global.utilities.format.formatNumbers(resultTornStats.spy.speed, 0, ".", ",") + "\n" +
                        "Strength: " + global.utilities.format.formatNumbers(resultTornStats.spy.strength, 0, ".", ",") + "\n" +
                        "Dexterity: " + global.utilities.format.formatNumbers(resultTornStats.spy.dexterity, 0, ".", ",") + "\n" +
                        "Defense: " + global.utilities.format.formatNumbers(resultTornStats.spy.defense, 0, ".", ",") + "\n" +
                        "Total: " + global.utilities.format.formatNumbers(resultTornStats.spy.total, 0, ".", ",") + "\n```"


                } else {
                    info.SpyResults = "None";
                }
            }else{
                info.SpyResults = "None";

            }


            var data = [];

            data.title = "[Join War Group Attack]";
            data.description = info.AttackerName+" ["+info.AttackerID+"] has requested help with "+info.DefenderName+" ["+info.DefenderID+"]" + "\nFaction: "+info.DefenderFactionName;

            data.url = "https://tornapps.com/tappsy/gajoin/"+info.DefenderID+"/"+channelID;
            data.color = "#4c73c8";
            data.spy = info.SpyResults;
            data.status = info.DefenderOnlineStatus + info.DefenderStatus;
            data.basicInfo = "Level: "+info.DefenderLevel+"\nRank: "+info.DefenderRank+"\nHealth: "+info.DefenderLife+"\nXanax Taken: " + global.utilities.format.formatNumbers(info.DefenderXanaxTaken,0,".",",");

            return data;

        },

        groupAssistRequest: function (apiKey,defenderID) {

            if(global.tornApps.authFunctions.checkIfCleanAPI(apiKey)) {

                const torn = new global.api.tornAPI(apiKey);
                torn.user.profile("").then((resultAttackerTorn) => {


                    const torn = new global.api.tornAPI(apiKey);
                    torn.custom.userCustomize(defenderID, ['profile', 'personalstats']).then((resultDefenderTorn) => {


                        const tornStats = new global.api.tornStats(apiKey);
                        tornStats.spy.target(defenderID).then((resultTornStats) => {


                            if (resultAttackerTorn.error === undefined) {

                                if (resultDefenderTorn.error === undefined) {

                                    var AttackerFactionID = resultAttackerTorn.faction.faction_id;
                                    var DefenderFactionID = resultDefenderTorn.faction.faction_id;



                                    if (global.tornApps.war.checkIfWarParticipant(AttackerFactionID)) {

                                        var warID = global.tornApps.war.getWarIDByFactionID(AttackerFactionID, DefenderFactionID);

                                        if (warID === 0) {

                                            if (global.tornApps.authFunctions.checkForGANonWarPermission(AttackerFactionID)) {

                                                //global.logger.error("Not a War");

                                                global.tornApps.war.nonWarAssistMe(resultAttackerTorn,resultDefenderTorn,resultTornStats,apiKey,defenderID,AttackerFactionID);

                                            }else{

                                                return false;

                                            }

                                        }else{

                                            global.tornApps.war.warAssistMe(resultAttackerTorn,resultDefenderTorn,resultTornStats,apiKey,defenderID,AttackerFactionID,warID);

                                        }

                                    }else{

                                        if (global.tornApps.authFunctions.checkForGANonWarPermission(AttackerFactionID)) {



                                            global.tornApps.war.nonWarAssistMe(resultAttackerTorn,resultDefenderTorn,resultTornStats,apiKey,defenderID,AttackerFactionID);

                                        }else{

                                            return false;

                                        }

                                    }

                                }

                            }


                        })

                    })

                })
            }

        }

    }
}

module.exports = warAttack();