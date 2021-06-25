const war = (control) => {

    var command = control.command;

    if(command === "createwar"){



        if(global.tornApps.authFunctions.checkIfCanUseGA(control)) {

            var message = global.tornApps.war.beginCreationOfWar(control);

            var data = {message: message};
            global.utilities.discordMsg.sendLocalBasicMessageInDMThenDelete(control, data, false);

        }

    }

    if(command === "allownonwarga"){

        var isAdmin = global.tornApps.authFunctions.checkIfBotAdmin(control);

        if(isAdmin){

            if(global.tornApps.authFunctions.checkIfCanUseGA(control)) {

                var registeredid = global.tornApps.authFunctions.returnRegisteredID(control);

                var guildID = global.tornApps.authFunctions.returnGuildID(control);

                var factionID = global.tornApps.authFunctions.returnFactionIDByControl(control);

                if (factionID !== 0) {

                    if (global.tornApps.war.checkFactionAssociation(registeredid, factionID)) {

                        global.tornApps.war.allowDisallowNonWarGA(control, registeredid, 1);

                    } else {

                        global.objects.formattedMessage.systemLocalFailThenDelete(control, "Allowing Non War Group Assists failed.", "You need to !associatemyfaction in your Discord first prior to allowing Non War Group Assists by your faction members.");

                    }

                }
            }

        }

    }



    if(command === "denynonwarga"){

        var isAdmin = global.tornApps.authFunctions.checkIfBotAdmin(control);

        if(isAdmin){

            if(global.tornApps.authFunctions.checkIfCanUseGA(control)) {

                var registeredid = global.tornApps.authFunctions.returnRegisteredID(control);

                var guildID = global.tornApps.authFunctions.returnGuildID(control);

                var factionID = global.tornApps.authFunctions.returnFactionIDByControl(control);

                if (factionID !== 0) {

                    if (global.tornApps.war.checkFactionAssociation(registeredid, factionID)) {

                        global.tornApps.war.allowDisallowNonWarGA(control, registeredid, 0);

                    } else {

                        global.objects.formattedMessage.systemLocalFailThenDelete(control, "Allowing Non War Group Assists failed.", "You need to !associatemyfaction in your Discord first prior to allowing Non War Group Assists by your faction members.");

                    }

                }
            }

        }

    }

    if(command === "clearbaseforga"){

        var isAdmin = global.tornApps.authFunctions.checkIfBotAdmin(control);



        if(isAdmin) {

            if (global.tornApps.authFunctions.checkIfCanUseGA(control)) {

                var registeredid = global.tornApps.authFunctions.returnRegisteredID(control);

                var guildID = global.tornApps.authFunctions.returnGuildID(control);

                var factionID = global.tornApps.authFunctions.returnFactionIDByControl(control);

                if (factionID !== 0) {

                    if (global.tornApps.war.checkFactionAssociation(registeredid, factionID)) {

                        global.tornApps.war.setBaseForGA(control, registeredid, factionID, 0);

                    } else {

                        global.tornApps.war.associateFaction(control, registeredid, factionID);

                    }

                }

            }
        }


    }

    if(command === "setbaseforga"){

        var isAdmin = global.tornApps.authFunctions.checkIfBotAdmin(control);



        if(isAdmin) {

            if (global.tornApps.authFunctions.checkIfCanUseGA(control)) {

                var registeredid = global.tornApps.authFunctions.returnRegisteredID(control);

                var guildID = global.tornApps.authFunctions.returnGuildID(control);

                var factionID = global.tornApps.authFunctions.returnFactionIDByControl(control);

                if (factionID !== 0) {

                    if (global.tornApps.war.checkFactionAssociation(registeredid, factionID)) {

                        global.tornApps.war.setBaseForGA(control, registeredid, factionID, 1);

                    } else {

                        global.tornApps.war.associateFaction(control, registeredid, factionID);

                    }

                }

            }
        }


    }

    if(command === "confirmgalink"){

        var isLeader = global.tornApps.authFunctions.checkIfLeaderByControl(control);



        if(isLeader) {

            if (global.tornApps.authFunctions.checkIfCanUseGA(control)) {

                var registeredid = global.tornApps.authFunctions.returnRegisteredID(control);

                var guildID = global.tornApps.authFunctions.returnGuildID(control);

                var factionID = global.tornApps.authFunctions.returnFactionIDByControl(control);



                if (factionID !== 0) {

                    if (global.tornApps.war.checkFactionAssociation(registeredid, factionID)) {

                        if(global.tornApps.war.checkFactionAssociationConfirmed(registeredid,factionID) === 1){

                            global.objects.formattedMessage.systemLocalFailThenDelete(control, "Faction Link Failed", "Your Faction (" + factionID + ") is already linked to this Discord.");

                        }else{

                            if(global.tornApps.war.checkFactionAssociationConfirmed(registeredid,factionID) === 0){

                                global.tornApps.war.confirmALinkFaction(control, registeredid, factionID);



                            }else{

                                global.objects.formattedMessage.systemLocalFailThenDelete(control, "Faction Link Failed", "Unknown error occurred. If this persists, please contact TornApps.");

                            }

                        }



                    } else {

                        global.logger.info("Failed Check Faction Association.");

                        global.objects.formattedMessage.systemLocalFailThenDelete(control, "Faction Link Failed", "Your Faction (" + factionID + ") has no link established. Have the Admin of this Discord type !newgalink XXXXX where X is your faction ID from Torn.");

                    }

                }

            }
        }

    }

    if(command === "newgalink"){

        var isAdmin = global.tornApps.authFunctions.checkIfBotAdmin(control);



        if(isAdmin) {

            if (global.tornApps.authFunctions.checkIfCanUseGA(control)) {

                var registeredid = global.tornApps.authFunctions.returnRegisteredID(control);

                var guildID = global.tornApps.authFunctions.returnGuildID(control);

                var factionID = control.argsNotSplit;

                if (factionID !== 0) {

                    if (global.tornApps.war.checkFactionAssociation(registeredid, factionID)) {

                        if(global.tornApps.war.checkFactionAssociationConfirmed(registeredid,factionID) === 1){

                            global.objects.formattedMessage.systemLocalFailThenDelete(control, "Faction Link Failed", "Your Faction (" + factionID + ") is already linked to this Discord.");

                        }else{

                            if(global.tornApps.war.checkFactionAssociationConfirmed(registeredid,factionID) === 0){

                                global.objects.formattedMessage.systemLocalFailThenDelete(control, "Faction Link Failed", "Your Faction (" + factionID + ") is waiting for confirmation to this Discord. Have them confirm with !confirmgalink .");

                            }else{

                                global.objects.formattedMessage.systemLocalFailThenDelete(control, "Faction Link Failed", "Unknown error occurred. If this persists, please contact TornApps.");

                            }

                        }



                    } else {

                        global.tornApps.war.linkAFaction(control, registeredid, factionID);

                    }

                }

            }
        }

    }

    if(command === "associatemyfaction"){

        var isAdmin = global.tornApps.authFunctions.checkIfBotAdmin(control);



        if(isAdmin) {

            if (global.tornApps.authFunctions.checkIfCanUseGA(control)) {

                var registeredid = global.tornApps.authFunctions.returnRegisteredID(control);

                var guildID = global.tornApps.authFunctions.returnGuildID(control);

                var factionID = global.tornApps.authFunctions.returnFactionIDByControl(control);

                if (factionID !== 0) {

                    if (global.tornApps.war.checkFactionAssociation(registeredid, factionID)) {

                        global.objects.formattedMessage.systemLocalFailThenDelete(control, "Faction Association Failed", "Your Faction (" + factionID + ") is already associated to this Discord.");

                    } else {

                        global.tornApps.war.associateFaction(control, registeredid, factionID);

                    }

                }

            }
        }


    }

    if(command === "groupalertsroom"){

        var isAdmin = global.tornApps.authFunctions.checkIfBotAdmin(control);

        var canGA = global.tornApps.authFunctions.checkIfCanUseGA(control);

        if(canGA) {


            if (isAdmin) {

                var registeredid = global.tornApps.authFunctions.returnRegisteredID(control);

                var guildID = global.tornApps.authFunctions.returnGuildID(control);

                var factionID = global.tornApps.authFunctions.returnFactionIDByControl(control);

                if (factionID !== 0) {

                    if (global.tornApps.war.checkFactionAssociation(registeredid, factionID)) {

                        global.tornApps.war.updateGroupAlertsRoom(control,registeredid);

                    } else {

                        global.objects.formattedMessage.systemLocalFailThenDelete(control, "Group Alerts Room Setting Failed", "You need to run !associatemyfaction first prior to !groupalertsroom .");

                    }

                }

            }
        }

    }



}

module.exports = war;