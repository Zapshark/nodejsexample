const war = function war() {

    return {

        beginCreationOfWar: function (control) {

            var GuildID = control.msg.guild.id;
            var AuthorID = control.msg.author.id;

            if (global.utilities.arrays.arrCheckExist("guild", GuildID, global.registry)) {


                var Guild = global.utilities.arrays.searchAllByKey(global.registry, "guild", GuildID);

                if (Guild.length === 1) {

                    if (Guild[0].allowga === 1) {

                        if (this.checkIfWarCreationExists(control)) {

                            return "A pending creation of a war by you already exists. Type !setwarpass **PASSWORDHERE** to finish creation or type !cancelwar.";

                        } else {

                            this.insertCreationOfWar(control, Guild[0]);
                            return "Please choose a password for this war by using !setwarpass **PASSWORDHERE** inside this PM.";

                        }
                    } else {

                        return "You naughty dog you... This isn't for you.";

                    }

                } else {

                    return "An unknown error occurred.";

                }


            } else {

                return "You naughty dog you... This isn't for you.";

            }

        },

        insertCreationOfWar: function (control, registryInfo) {

            global.track.wars.creating.push({
                guild: control.msg.guild.id,
                createdby: control.msg.author.id,
                warpass: "",
                groupalertsroom: registryInfo.groupalertsroom,
                registryid: registryInfo.id
            })

        },

        getChannelIDByWarIDFactionID: function (warID, factionID) {

            for (var i in global.track.wars.participants) {

                if (global.track.wars.participants[i].factionid === factionID) {

                    if (global.track.wars.participants[i].warid === warID) {

                        return global.track.wars.participants[i].channelid;

                    }

                }

            }

            return false;

        },

        getWarIDByFactionID: function (factionID, defenderID) {

            var warID = 0;

            var warIDCheck = 0;

            for (var i in global.track.wars.waragainst) {

                if (global.track.wars.waragainst[i].factionid === defenderID) {

                    warIDCheck = global.track.wars.waragainst[i].factionid;
                    break;
                }

            }

            if (warIDCheck !== 0) {

                for (var x in global.track.wars.participants) {

                    if (global.track.wars.participants[x].factionid === factionID) {

                        if (global.track.wars.participants[x].warid === warIDCheck) {

                            warID = global.track.wars.participants[x].warid;
                            break;

                        }

                    }

                }

            }

            return warID;

        },

        grabAllWarParticipants: function (warID) {

            var participants = [];


            for (var i in global.track.wars.participants) {

                if (global.track.wars.participants[i].warid === warID) {

                    participants.push(global.track.wars.participants[i]);

                }

            }

            return participants;

        },

        checkIfWarParticipant: function (factionID) {

            for (var i in global.track.wars.participants) {

                if (global.track.wars.participants[i].factionid === factionID) {

                    return true;

                }

            }

            return false;


        },

        checkIfWarCreationExists: function (control) {

            for (var i in global.track.wars.creating) {

                if (global.track.wars.creating[i]["createdby"] === control.msg.author.id) {

                    return true;

                }

            }

            return false;

        },

        setWarPass: function (control) {

            if (this.checkIfWarCreationExists(control)) {

                for (var i in global.track.wars.creating) {

                    if (global.track.wars.creating[i].createdby === control.msg.author.id) {

                        global.track.wars.creating[i].warpass = control.argsNotSplit;
                        this.commitWar(control, i);

                    }

                }

            }

        },

        commitWar: function (control, i) {

            var data = global.track.wars.creating[i];

            var warname = "";
            var warpass = data.warpass;
            var unixts = new Date().getTime() / 1000;
            var allowmultiple = 1;
            var createdby = data.createdby;
            var registeredid = data.registryid;

            var returnData = [];
            returnData.message = warpass;

            var query = `INSERT INTO bot_warmonitor (warname, warpass, unixts, allowmultiple, createdby, registeredid) VALUES ("${warname}","${warpass}",${unixts},${allowmultiple},${createdby},${registeredid});`;
            global.tornApps.war.sqlInterface(query, global.tornApps.war.warCreated, global.tornApps.war.warNotCreated, createdby, returnData);


        },

        warCreated: function (createdby, returnData) {


            var data = [];

            global.tornApps.war.purgeCreated(createdby);

            global.utilities.preloadWarmup.loadAllWar();

            data.message = "Your war has been created and started successfully. Be sure to consider naming it with !setwarname **Your War Name**. You can now join this war by typing in this PM !joinwar **" + returnData.message + "**";

            global.utilities.discordMsg.sendBasicMessageInDM(createdby, data, false);

        },

        warNotCreated: function (control, returnData) {

            var data = [];
            global.logger.debug(returnData);
            data.message = "There was a problem creating this new war. If this problem persists, contact TornApps.";

            global.utilities.discordMsg.sendLocalBasicMessageInDM(control, data, false);
        },

        purgeCreated: function (createdby) {


            for (var i in global.track.wars.creating) {

                if (global.track.wars.creating[i].createdby === createdby) {

                    global.track.wars.creating.splice(i, 1);
                    break;

                }

            }


        },

        getWarByPassword(password) {


            for (var i in global.track.wars.monitor) {

                if (global.track.wars.monitor[i].warpass === password) {

                    return global.track.wars.monitor[i];

                }

            }

            return false;

        },

        joinWarByPassword(control, password) {

            var warData = global.tornApps.war.getWarByPassword(password);


            if (warData !== false) {


                var factionID = global.tornApps.authFunctions.returnFactionIDByControl(control);

                if (factionID !== 0) {


                    if (global.tornApps.war.checkIfWarParticipant(factionID)) {

                        global.objects.formattedMessage.systemLocalDMFailThenDelete(control, "Join War Failed", "You are already in this war. To leave, type !leavewar ***" + password + "***", false);

                    } else {


                        if (global.tornApps.authFunctions.checkForGAAssociation(factionID)) {

                            global.tornApps.war.addWarParticipant(control, warData, factionID);

                        } else {

                            global.objects.formattedMessage.systemLocalDMFailThenDelete(control, "Join War Failed", "You have not associated your Faction with a discord. Go to your Group Attack Alerts room and type !associatemyfaction and then !groupalertsroom", false);

                        }

                    }

                }

            }

        },

        addWarParticipant: function (control, warData, factionID) {

            var warID = warData.id;

            var registerData = global.tornApps.war.getBaseForGA(factionID);




            if (registerData !== false) {

                var channelID = registerData.groupalertsroom;
                var registeredid = registerData.id;
                var data = "";
                var returnData = [];
                returnData.message = "Success";

                var query = `INSERT INTO bot_warparticipants (channelid, data, warid, registeredid, factionid) VALUES ("${channelID}","${data}",${warID},${registeredid},${factionID});`;
                global.tornApps.war.sqlInterface(query, global.tornApps.war.warParticipantAddSuccess, global.tornApps.war.warParticipantAddFail, control, returnData);

            }

        },

        warParticipantAddSuccess: function (control, returnData) {

            global.objects.formattedMessage.systemLocalDMSuccessThenDelete(control, "Joined The War", "You have successfully joined this war. You will now receive Group Alerts in your group alerts room.", false);

            global.utilities.preloadWarmup.loadWarParticipants();

        },

        warParticipantAddFail: function (control, returnData) {

            global.objects.formattedMessage.systemLocalDMFailThenDelete(control, "Join War Failed", "There was a problem adding you to this war. If this continues to happen, please contact TornApps.", false);

        },


        associateFactionSuccess: function (control, returnData) {

            global.objects.formattedMessage.systemLocalSuccessThenDelete(control, "Faction Association Successful", "You have successfully associated your Faction (" + returnData.factionID + ") to this Discord.", false);

            global.utilities.preloadWarmup.loadGAAssociation();

        },

        associateFactionFail: function (control, returnData) {

            global.objects.formattedMessage.systemLocalFailThenDelete(control, "Faction Association Failed", "There was a problem association your Faction (" + returnData.factionID + ") to this Discord.");

            global.logger.error(returnData.error);

        },

        linkAFactionSuccess: function (control, returnData) {

            global.objects.formattedMessage.systemLocalSuccessThenDelete(control, "Faction Link Initiated", "You have begun the process of linking a Faction (" + returnData.factionID + ") to this Discord. Have the Leader of this faction type !confirmgalink (be sure they are signed up to TornApps)", false);

            global.utilities.preloadWarmup.loadGAAssociation();

        },

        linkAFactionFail: function (control, returnData) {

            global.objects.formattedMessage.systemLocalFailThenDelete(control, "Faction Link Failed", "There was a problem linking Faction (" + returnData.factionID + ") to this Discord.");

            global.logger.error(returnData.error);

        },

        confirmLinkAFactionSuccess: function (control, returnData) {

            global.objects.formattedMessage.systemLocalSuccessThenDelete(control, "Faction Link Success", "Your faction will now broadcast Non-War Group Assists in this Discord.", false);

            global.utilities.preloadWarmup.loadGAAssociation();

        },

        confirmLinkAFactionFail: function (control, returnData) {

            global.objects.formattedMessage.systemLocalFailThenDelete(control, "Faction Link Failed", "There was a problem linking Faction (" + returnData.factionID + ") to this Discord.");

            global.logger.error(returnData.error);

        },

        linkAFaction: function (control, registeredID, factionID) {


            returnData = [];
            returnData.factionID = factionID;
            returnData.registeredID = registeredID;

            var query = `INSERT INTO bot_gafactionassoc (registeredid, factionid, confirmed) VALUES (${registeredID},${factionID},0);`;
            this.sqlInterface(query, this.linkAFactionSuccess, this.linkAFactionFail, control, returnData);


        },

        confirmALinkFaction: function (control, registeredID, factionID){

            returnData = [];
            returnData.factionID = factionID;
            returnData.registeredID = registeredID;

            var query = `UPDATE bot_gafactionassoc SET confirmed=1 WHERE registeredid='${registeredID}' AND factionid='${factionID}' AND confirmed=0;`;
            this.sqlInterface(query, this.confirmLinkAFactionSuccess, this.confirmLinkAFactionFail, control, returnData);


        },

        associateFaction: function (control, registeredID, factionID) {


            returnData = [];
            returnData.factionID = factionID;
            returnData.registeredID = registeredID;

            var query = `REPLACE INTO bot_gafactionassoc (registeredid, factionid, confirmed) VALUES (${registeredID},${factionID},1);`;
            this.sqlInterface(query, this.associateFactionSuccess, this.associateFactionFail, control, returnData);


        },

        nonWarGASuccess: function (control, returnedData) {

            global.objects.formattedMessage.systemLocalSuccessThenDelete(control, "Allowing Non-War Group Assist Alerts Changed", "You have successfully changed allowing Non-War Group Assist Alerts by faction members.");

            global.utilities.preloadWarmup.loadBotRegistry();

        },
        nonWarGAFail: function (control, returnedData) {

            global.objects.formattedMessage.systemLocalFailThenDelete(control, "Changing Non-War Group Assist Alerts Failed", "There was a problem with the bot changing allowing group assist alerts. If this problem persists, contact TornApps.");

            global.logger.error(returnData.error);

        },

        allowDisallowNonWarGA: function (control, registeredID, flag) {


            returnData = [];
            returnData.flag = flag;
            returnData.registeredID = registeredID;

            var query = "UPDATE bot_registered SET allownonwarga=" + flag + " WHERE id=" + registeredID;
            this.sqlInterface(query, this.nonWarGASuccess, this.nonWarGAFail, control, returnData);


        },

        dontCare: function (control, returnedData) {

        },

        getBaseForGA: function (factionID) {

            var registeredID = 0;


            for (var i in global.track.wars.gafactionassoc) {

                if (global.track.wars.gafactionassoc[i].factionid === factionID) {


                    if (global.track.wars.gafactionassoc[i].isbase === 1) {

                        registeredID = global.track.wars.gafactionassoc[i].registeredid;

                        break;

                    }

                }

            }

            if (registeredID !== 0) {

                return global.tornApps.authFunctions.returnRegisterByRegisterID(registeredID);

            } else {

                return false;

            }


        },

        setBaseForGA: function (control, registeredID, factionID, flag) {


            returnData = [];
            returnData.flag = flag;
            returnData.registeredID = registeredID;

            var queryOne = "UPDATE bot_gafactionassoc SET isbase=0 WHERE factionid=" + factionID;
            var queryTwo = "UPDATE bot_gafactionassoc SET isbase=" + flag + " WHERE registeredid=" + registeredID;
            this.sqlInterface(queryOne, this.dontCare, this.dontCare, control, returnData);
            this.sqlInterface(queryTwo, this.setBaseForGASuccess, this.setBaseForGAFail, control, returnData);


        },
        setBaseForGASuccess: function (control, returnedData) {

            global.objects.formattedMessage.systemLocalSuccessThenDelete(control, "Base for All Group Assist Alerts Set", "You have successfully changed the settings for the Base of all Group Assist Alerts for your faction.");

            global.utilities.preloadWarmup.loadGAAssociation();

        },
        setBaseForGAFail: function (control, returnedData) {

            global.objects.formattedMessage.systemLocalFailThenDelete(control, "Base for All Group Assist Alerts Failed", "There was an issue setting the Base of all Group Assist Alerts for your faction. If this persists, contact TornApps.");

            global.logger.error(returnData.error);

        },


        checkBase: function (registeredid, factionid) {

            for (var i in global.track.wars.gafactionassoc) {

                if (global.track.wars.gafactionassoc[i].registeredid === registeredid) {

                    if (global.track.wars.gafactionassoc[i].factionid === factionid) {

                        return true;

                    } else {

                        return false;

                    }

                } else {

                    return false;

                }

            }

        },


        checkIfTargetExists: function (warID,targetFactionID){


            for(var i in global.track.wars.waragainst){

                if(global.track.wars.waragainst[i].warid === warID){

                    if(global.track.wars.waragainst[i].factionid == targetFactionID){
                        global.logger.debug("Found Faction");
                        return true;

                    }

                }

            }

            return false;

        },

        addNewWarTarget: function (control,factionID){


            var warID = global.tornApps.authFunctions.returnWarIDbyUserID(control);

            if (warID !== false) {

                var data = "";
                var notes = "";
                var returnData = [];
                returnData.message = "Success";
                returnData.factionID = factionID;

                var query = `INSERT INTO bot_waragainst (warid, factionid, notes, data) VALUES ("${warID}","${factionID}","${notes}","${data}");`;
                global.tornApps.war.sqlInterface(query, global.tornApps.war.addNewTargetSuccess, global.tornApps.war.addNewTargetFail, control, returnData);

            }

        },
        removeWarTarget: function (control,factionID){


            var warID = global.tornApps.authFunctions.returnWarIDbyUserID(control);

            if (warID !== false) {

                var data = "";
                var notes = "";
                var returnData = [];
                returnData.message = "Success";
                returnData.factionID = factionID;

                var query = 'DELETE FROM bot_waragainst WHERE factionid='+factionID+' AND warid='+warID;
                global.tornApps.war.sqlInterface(query, global.tornApps.war.removeTargetSuccess, global.tornApps.war.removeTargetFail, control, returnData);

            }

        },

        deleteWar: function (control){


            var warID = global.tornApps.authFunctions.returnWarIDbyUserID(control);

            if (warID !== false) {

                var data = "";
                var notes = "";
                var returnData = [];
                returnData.message = "Success";
                returnData.warID = warID;

                var queryOne = 'DELETE FROM bot_waragainst WHERE warid='+warID;
                var queryTwo = 'DELETE FROM bot_warparticipants WHERE warid='+warID;
                var queryThree = 'DELETE FROM bot_warmonitor WHERE id='+warID;
                global.tornApps.war.sqlInterface(queryOne, global.tornApps.war.dontCare, global.tornApps.war.dontCare, control, returnData);
                global.tornApps.war.sqlInterface(queryTwo, global.tornApps.war.dontCare, global.tornApps.war.dontCare, control, returnData);
                global.tornApps.war.sqlInterface(queryThree, global.tornApps.war.deleteWarSuccess, global.tornApps.war.deleteWarFail, control, returnData);

            }

        },
        deleteWarSuccess: function (control,returnData){

            global.objects.formattedMessage.systemLocalDMSuccessThenDelete(control,"Stop War Complete","All War Monitoring for your war has ended.",false);

            global.utilities.preloadWarmup.loadAllWar();


        },

        deleteWarFail: function (control,returnData){

            global.objects.formattedMessage.systemLocalDMSuccessThenDelete(control,"Stop War Failed","There was a problem stopping your war. Please contact TornApps.",false);

        },
        removeTargetSuccess: function (control,returnData){

            global.objects.formattedMessage.systemLocalDMSuccessThenDelete(control,"War Target Removed","Removal of Target ("+returnData.factionID+") is successful.",false);

            global.utilities.preloadWarmup.loadWarAgainst();


        },

        removeTargetFail: function (control,returnData){

            global.objects.formattedMessage.systemLocalDMSuccessThenDelete(control,"War Target Removal Error","Error occurred removing target ("+returnData.factionID+"). If this problem persists, contact TornApps.",false);

        },
        addNewTargetSuccess: function (control,returnData){

              global.objects.formattedMessage.systemLocalDMSuccessThenDelete(control,"New War Target Added","A new war target ("+returnData.factionID+") has been added successfully.",false);

              global.utilities.preloadWarmup.loadWarAgainst();


        },

        addNewTargetFail: function (control,returnData){

            global.objects.formattedMessage.systemLocalDMSuccessThenDelete(control,"New War Target Failed","Error occurred adding ("+returnData.factionID+"). If this problem persists, contact TornApps.",false);

        },

        updateGroupAlertsRoom: function (control, registeredid) {


            returnData = [];

            returnData.registeredID = registeredid;
            returnData.channelID = control.msg.channel.id;

            var groupalertsroom = control.msg.channel.id;


            var queryOne = 'UPDATE bot_registered SET groupalertsroom="'+groupalertsroom+'" WHERE id=' + registeredid;

            this.sqlInterface(queryOne, global.tornApps.war.updateGroupAlertsSuccess, global.tornApps.war.updateGroupAlertsFail, control, returnData);



        },

        updateGroupAlertsFail: function (control,returnData){

            global.objects.formattedMessage.systemLocalFailThenDelete(control,"Group Alerts Room Setting Failed","There was a problem establishing your Group Alerts Room. If the problem persists, please contact TornApps.");

        },

        updateGroupAlertsSuccess: function (control,returnData){

            global.objects.formattedMessage.systemLocalSuccessThenDelete(control,"Group Alerts Room Set","Your group alerts room has been updated.");

            global.utilities.preloadWarmup.loadBotRegistry();

        },

        checkFactionAssociation: function (registeredid, factionid) {

            for (var i in global.track.wars.gafactionassoc) {

                if (global.track.wars.gafactionassoc[i].registeredid === registeredid) {

                    if (global.track.wars.gafactionassoc[i].factionid === factionid) {

                        return true;

                    }

                }

            }

            return false;

        },
        checkFactionAssociationConfirmed: function (registeredid, factionid) {

            for (var i in global.track.wars.gafactionassoc) {

                if (global.track.wars.gafactionassoc[i].registeredid === registeredid) {

                    if (global.track.wars.gafactionassoc[i].factionid === factionid) {



                            return global.track.wars.gafactionassoc[i].confirmed;


                    }

                }

            }

            return false;

        },

        warAssistMe: function (resultAttackerTorn, resultDefenderTorn, resultTornStats, apiKey, defenderID, AttackerFactionID, warID) {

            var allWarParticipants = glogal.tornApps.war.grabAllWarParticipants(warID);

            var timerValid = false;

            for(var i in allWarParticipants){

                timerValid = true;
                var channelID = allWarParticipants[i].channelid;
                var formattedMessage = global.objects.warAttack.initialWarGroupDataAssemble(resultAttackerTorn, resultDefenderTorn, resultTornStats, channelID);

                var data = [];
                data.formattedMessage = global.objects.warAttack.formatFromDataGroupAssist(formattedMessage);

                global.utilities.discordMsg.sendGroupAssistMessage(channelID, data, defenderID);


            }

            if(timerValid){

                setTimeout(global.tornApps.war.clearDefenderDeleteMessage, 150000, defenderID);

            }

        },

        nonWarAssistMe: function (resultAttackerTorn, resultDefenderTorn, resultTornStats, apiKey, defenderID, AttackerFactionID) {

            var registeredID = global.tornApps.authFunctions.returnAllRegisteredIDByFactionID(AttackerFactionID);
            var timerValid = false;
            for (var i in registeredID) {

                timerValid = true;
                var registry = global.tornApps.authFunctions.returnRegisterByRegisterID(registeredID[i]);

                var channelID = registry.groupalertsroom;

                var formattedMessage = global.objects.warAttack.initialGroupDataAssemble(resultAttackerTorn, resultDefenderTorn, resultTornStats, channelID);

                var data = [];
                data.formattedMessage = global.objects.warAttack.formatFromDataGroupAssist(formattedMessage);

                global.utilities.discordMsg.sendGroupAssistMessage(channelID, data, defenderID);
            }

            if(timerValid){

                setTimeout(global.tornApps.war.clearDefenderDeleteMessage, 150000, defenderID);

            }

        },

        clearDefenderDeleteMessage: function (defenderID) {

            var channelID, messageID;


            for (var i = global.track.groupalerts.byDefend.length - 1; i >= 0; i--) {

                if (global.track.groupalerts.byDefend[i].defenderID === defenderID) {

                    channelID = global.track.groupalerts.byDefend[i].channelID;
                    messageID = global.track.groupalerts.byDefend[i].messageID;

                    try {
                        global.utilities.discordMsg.deleteMessage(channelID, messageID, 1000);

                        global.track.groupalerts.byDefend.splice(i, 1);
                    }catch (err){
                        global.logger.error(err);

                    }

                }
            }

            //global.logger.error(global.track.groupalerts.byDefend);

        },

        addNewDefender: function (defenderID, channelID, messageID) {

            if (global.utilities.arrays.arrCheckExist("messageID", messageID, global.track.groupalerts.byDefend) === false) {
                global.track.groupalerts.byDefend.push({
                    defenderID: defenderID,
                    channelID: channelID,
                    messageID: messageID,
                    count: 0
                });

                //global.tornApps.war.joinCountUpdate(defenderID,1);

                //global.logger.error("Added New Defender");
                //setTimeout(global.tornApps.war.clearDefenderDeleteMessage, 60000, defenderID);
                //global.logger.error(global.track.groupalerts.byDefend);
                return true;
            } else {

                return false;

            }
        },

        joinIncreaseCount: function (defenderID) {

            var count;

            for (var x in global.track.groupalerts.byDefend) {

                if (global.track.groupalerts.byDefend[x].defenderID === defenderID) {

                    count = global.track.groupalerts.byDefend[x].count + 1;

                    global.track.groupalerts.byDefend[x].count = count;

                }

            }

            this.joinCountUpdate(defenderID);


        },

        joinCountUpdate: function (defenderID) {

            var allEffected = global.utilities.arrays.searchAllByKey(global.track.groupalerts.byDefend, "defenderID", defenderID);

            for (var i in allEffected) {

                global.utilities.discordMsg.getMessage(allEffected[i].channelID, allEffected[i].messageID, this.joinCountCallback, allEffected[i]);

            }


        },

        joinCountCallback: function (msg, data) {

            var count = data.count;
            var getEmoji;
            if (global.numericEmoji[count] === undefined) {
                getEmoji = global.numericEmoji[11];
            } else {
                getEmoji = global.numericEmoji[count];
            }


            msg.reactions.removeAll();
            msg.react(getEmoji);

        },


        sqlInterface: function (query, callback, callbackError, control, returnData) {

            global.utilities.mysqlFunctions.open;

            global.mysqlCon.query(query, function (err, result, fields) {
                if (err) {
                    returnData.error = err;

                    callbackError(control, returnData);
                }

                callback(control, returnData);


            });

            global.utilities.mysqlFunctions.close;

        },

        sqlMultipleInterface: function (query, callback, callbackError, control, returnData) {

            global.utilities.mysqlFunctions.openMultiple;

            global.mysqlCon.query(query, function (err, result, fields) {
                if (err) {
                    returnData.error = err;

                    callbackError(control, returnData);
                }

                callback(control, returnData);


            });

            global.utilities.mysqlFunctions.close;

        }


    }

}

module.exports = war();