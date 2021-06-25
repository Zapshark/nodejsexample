const verify = function verify() {

    return {


        localVerify: function (control){


            var objectInterface = new global.tornApps.objectInterface;

            objectInterface.memberObject.localMemberByDiscordID(control.msg.author.id, control, global.tornApps.verify.discordLocalAssociatedSuccess, global.tornApps.verify.discordLocalAssociatedFail);


        },


        localTestVerify: function (control){


            var objectInterface = new global.tornApps.objectInterface;

            objectInterface.memberObject.localMemberByDiscordID(control.msg.author.id, control, global.tornApps.verify.discordLocalTestAssociatedSuccess, global.tornApps.verify.discordLocalTestAssociatedFail);


        },



        updateVerifySchedule: function (control,guildID){


            var lastverify = Date.now();



        },

        grabRolesByCacheByGuildID: function (guildID){

            var arr = [];

            for(var i in global.db.guildcache.roles){

                if(global.db.guildcache.roles[i].guildid === guildID){

                    arr.push(global.db.guildcache.roles[i]);

                }

            }

            return arr;

        },

        grabRolesByFactionByGuildID: function (guildID){

            var arr = [];

            for(var i in global.db.settings.rolebyfaction){

                if(global.db.settings.rolebyfaction[i].guildid === guildID){

                    arr.push(global.db.settings.rolebyfaction[i]);

                }

            }

            return arr;

        },
        grabRolesForFactionByGuildID: function (guildID){

            var arr = [];

            for(var i in global.db.settings.roleforfaction){

                if(global.db.settings.roleforfaction[i].guildid === guildID){

                    arr.push(global.db.settings.roleforfaction[i]);

                }

            }

            return arr;

        },

        checkIfHasRoleByID(roleID,serverRoles){

            for(var i in serverRoles){

                if(serverRoles[i].id === roleID){

                    return true;

                }

            }

            return false;

        },

        grabMemberObjectByDiscordID(discordID){

            for(var i in global.db.memberObjects){

                if(global.db.memberObjects[i].discordid===discordID){

                    return global.db.memberObjects[i];

                }

            }

        },


        grabRoleNameByCacheById(roleID,roles){

            for (var i in roles){

                if(roles[i].roleid === roleID){

                    return roles[i].rolename;

                }

            }

            return false;

        },


        grabRoleNameById(roleID,roles){

            for (var i in roles){

                if(roles[i].id === roleID){

                    return roles[i].name;

                }

            }

            return false;

        },

        checkForcedVerify(discordID,control){

            var guildObject = global.client.guilds.cache.get(control.msg.guild.id);

            var member = guildObject.members.cache.get(discordID);

            global.tornApps.verify.checkForDiscord(discordID,member);

        },


        discordScheduledVerifyRolesByDiscordID: function (discordID,guildID){

            var rolesByFaction = global.tornApps.verify.grabRolesByFactionByGuildID(guildID);
            var rolesForFaction = global.tornApps.verify.grabRolesForFactionByGuildID(guildID);
            var allGuildRoles = global.tornApps.verify.grabRolesByCacheByGuildID(guildID);
            var guild = global.tornApps.authFunctions.returnRegisterByGuildID(guildID);

            if (guild !== false) {


                if (guild.verify === 1) {

                    if (guild.verifyrole !== 0) {

                        if (guild.adminchannel !== 0) {


                            var guildFactionID = guild.factionid;


                            var guildObject = global.client.guilds.cache.get(guildID);

                            var member = guildObject.members.cache.get(discordID);

                            var memberObject = global.tornApps.verify.grabMemberObjectByDiscordID(discordID);

                            var memberFactionID = memberObject.faction_id;
                            var memberPosition = memberObject.position;

                            var parsedRolesByFaction = [];
                            var parsedRolesForFaction = [];
                            var memberRoles = [];

                            var arr = [];

                            var roles = member.roles.cache.forEach(roles => arr.push({id: roles.id, name: roles.name}));

                            for (var i in arr) {

                                if (arr[i].name !== '@everyone') {

                                    memberRoles.push(arr[i]);

                                }

                            }


                            for (var x in rolesByFaction) {


                                parsedRolesByFaction.push({
                                    id: rolesByFaction[x].roleid,
                                    name: global.tornApps.verify.grabRoleNameByCacheById(rolesByFaction[x].roleid, allGuildRoles),
                                    position: rolesByFaction[x].position
                                });

                            }

                            for (var j in rolesForFaction) {


                                parsedRolesForFaction.push({
                                    id: rolesForFaction[j].roleid,
                                    name: global.tornApps.verify.grabRoleNameByCacheById(rolesForFaction[j].roleid, allGuildRoles),
                                    faction: rolesForFaction[j].factionid
                                });

                            }


                            var giveRoles = [];
                            var removeRoles = [];
                            var haveRoles = [];
                            var haveFactionRoles = [];
                            var factionNames = [];


                            if (memberFactionID !== guildFactionID) {

                                for (var b in parsedRolesByFaction) {

                                    var currFactionRole = parsedRolesByFaction[b].id;

                                    for (var c in memberRoles) {

                                        var currDiscordRole = memberRoles[c].id;

                                        if (currDiscordRole === currFactionRole) {

                                            removeRoles.push(currDiscordRole);

                                        }

                                    }

                                }

                                for (var h in parsedRolesForFaction){

                                    var currForFactionRole = parsedRolesForFaction[h].id;

                                    var currForFactionID = parsedRolesForFaction[h].faction;
                                    console.log("Curr: "+currForFactionID+" Mem: "+memberFactionID);
                                    if(currForFactionID.toString() === memberFactionID.toString()){

                                        var needsRole = true;

                                        for (var j in memberRoles){

                                            if(memberRoles[j].id === currForFactionRole){

                                                needsRole = false;
                                                haveFactionRoles.push(parsedRolesForFaction[h].name);
                                                factionNames.push(global.tornApps.authFunctions.returnFactionNameByID(parsedRolesForFaction[h].faction));

                                            }

                                        }

                                        if(needsRole === true){

                                            giveRoles.push({id:currForFactionRole,name:parsedRolesForFaction[h].name});
                                            haveFactionRoles.push(parsedRolesForFaction[h].name);
                                            factionNames.push(global.tornApps.authFunctions.returnFactionNameByID(parsedRolesForFaction[h].faction));
                                        }

                                    }else{

                                        for (var u in memberRoles){

                                            if(memberRoles[u].id === currForFactionRole){

                                                removeRoles.push(currForFactionRole);

                                            }

                                        }

                                    }

                                }

                            } else {

                                for (var f in parsedRolesByFaction) {

                                    var currFactionRole = parsedRolesByFaction[f].id;


                                    if (parsedRolesByFaction[f].position === memberPosition) {

                                        if (global.tornApps.verify.checkIfHasRoleByID(currFactionRole, memberRoles) === false) {

                                            giveRoles.push({id: currFactionRole, name: parsedRolesByFaction[f].name});
                                            haveRoles.push(parsedRolesByFaction[f].name);

                                        } else {

                                            haveRoles.push(parsedRolesByFaction[f].name);

                                        }

                                    } else {

                                        if (global.tornApps.verify.checkIfHasRoleByID(currFactionRole, memberRoles)) {

                                            removeRoles.push({id: currFactionRole, name: parsedRolesByFaction[f].name});

                                        }

                                    }

                                }

                            }
                            //console.log(allGuildRoles);
                            //console.log("Member Position:");
                            //console.log(memberPosition);
                            //console.log("Give Roles:");
                            //console.log(giveRoles);
                            //console.log("Remove Roles:");
                            //console.log(removeRoles);
                            //console.log("Have Roles:");
                            //console.log(haveRoles);

                            try {

                                let role = guildObject.roles.cache.find(role => role.id === guild.verifyrole);
                                if (role) guildObject.members.cache.get(discordID).roles.add(role);

                                for(var t in removeRoles){

                                    let removeRole = guildObject.roles.cache.find(role => role.id === removeRoles[t].id);
                                    if (removeRole) guildObject.members.cache.get(discordID).roles.remove(removeRole);
                                }

                                for(var u in giveRoles){

                                    let giveRole = guildObject.roles.cache.find(role => role.id === giveRoles[u].id);
                                    if (giveRole) guildObject.members.cache.get(discordID).roles.add(giveRole);

                                }

                                if (memberObject !== false) {

                                    let NewNick = memberObject.name + " [" + memberObject.player_id + "]";

                                    member.setNickname(NewNick).catch(console.error);

                                    var roleName = global.tornApps.authFunctions.getRoleNameByID(guild.verifyrole);

                                    var message = "Verified " + NewNick + ". given the ***@"+roleName+"*** role.";
                                    message += "\n\n";

                                    for (var a in haveRoles){

                                        message += "Given **@"+haveRoles[a]+"** Due to Position: **"+memberPosition+"**\n";

                                    }

                                    for (var o in haveFactionRoles){

                                        message += "Given **@"+haveFactionRoles[o]+"** Due to Faction: "+factionNames[o]+"\n";

                                    }

                                    global.objects.formattedMessage.systemSuccessThenDelete(guild.adminchannel, "Verification Complete", message, false);
                                }

                            } catch (err) {
                                global.logger.error(err);

                            }

                        }
                    }
                }
            }



        },


        discordVerifyRolesByDiscordID: function (discordID,guildID){

            var rolesByFaction = global.tornApps.verify.grabRolesByFactionByGuildID(guildID);
            var rolesForFaction = global.tornApps.verify.grabRolesForFactionByGuildID(guildID);
            var allGuildRoles = global.tornApps.verify.grabRolesByCacheByGuildID(guildID);
            var guild = global.tornApps.authFunctions.returnRegisterByGuildID(guildID);

            if (guild !== false) {


                if (guild.verify === 1) {

                    if (guild.verifyrole !== 0) {

                        if (guild.welcomechannel !== 0) {


                            var guildFactionID = guild.factionid;


                            var guildObject = global.client.guilds.cache.get(guildID);

                            var member = guildObject.members.cache.get(discordID);

                            var memberObject = global.tornApps.verify.grabMemberObjectByDiscordID(discordID);

                            var memberFactionID = memberObject.faction_id;
                            var memberPosition = memberObject.position;

                            var parsedRolesByFaction = [];
                            var parsedRolesForFaction = [];
                            var memberRoles = [];
                            var factionNames = [];

                            var arr = [];

                            var roles = member.roles.cache.forEach(roles => arr.push({id: roles.id, name: roles.name}));

                            for (var i in arr) {

                                if (arr[i].name !== '@everyone') {

                                    memberRoles.push(arr[i]);

                                }

                            }


                            for (var x in rolesByFaction) {


                                parsedRolesByFaction.push({
                                    id: rolesByFaction[x].roleid,
                                    name: global.tornApps.verify.grabRoleNameByCacheById(rolesByFaction[x].roleid, allGuildRoles),
                                    position: rolesByFaction[x].position
                                });

                            }

                            for (var j in rolesForFaction) {


                                parsedRolesForFaction.push({
                                    id: rolesForFaction[j].roleid,
                                    name: global.tornApps.verify.grabRoleNameByCacheById(rolesForFaction[j].roleid, allGuildRoles),
                                    faction: rolesForFaction[j].factionid
                                });

                            }


                            var giveRoles = [];
                            var removeRoles = [];
                            var haveRoles = [];
                            var haveFactionRoles = [];

                            if (memberFactionID !== guildFactionID) {

                                for (var b in parsedRolesByFaction) {

                                    var currFactionRole = parsedRolesByFaction[b].id;

                                    for (var c in memberRoles) {

                                        var currDiscordRole = memberRoles[c].id;

                                        if (currDiscordRole === currFactionRole) {

                                            removeRoles.push(currDiscordRole);

                                        }

                                    }

                                }

                                for (var h in parsedRolesForFaction){

                                    var currForFactionRole = parsedRolesForFaction[h].id;

                                    var currForFactionID = parsedRolesForFaction[h].faction;
                                    console.log("Curr: "+currForFactionID+" Mem: "+memberFactionID);
                                    if(currForFactionID.toString() === memberFactionID.toString()){

                                        var needsRole = true;

                                        for (var j in memberRoles){

                                            if(memberRoles[j].id === currForFactionRole){

                                                needsRole = false;
                                                haveFactionRoles.push(parsedRolesForFaction[h].name);
                                                let factionName = global.tornApps.authFunctions.returnFactionNameByID(parsedRolesForFaction[h].faction);
                                                factionNames.push(factionName);

                                            }

                                        }

                                        if(needsRole === true){

                                            giveRoles.push({id:currForFactionRole,name:parsedRolesForFaction[h].name});
                                            haveFactionRoles.push(parsedRolesForFaction[h].name);
                                            let factionName = global.tornApps.authFunctions.returnFactionNameByID(parsedRolesForFaction[h].factionid);
                                            factionNames.push(factionName);
                                        }

                                    }else{

                                        for (var u in memberRoles){

                                            if(memberRoles[u].id === currForFactionRole){

                                                removeRoles.push(currForFactionRole);

                                            }

                                        }

                                    }

                                }

                            } else {

                                for (var f in parsedRolesByFaction) {

                                    var currFactionRole = parsedRolesByFaction[f].id;


                                    if (parsedRolesByFaction[f].position === memberPosition) {

                                        if (global.tornApps.verify.checkIfHasRoleByID(currFactionRole, memberRoles) === false) {

                                            giveRoles.push({id: currFactionRole, name: parsedRolesByFaction[f].name});
                                            haveRoles.push(parsedRolesByFaction[f].name);

                                        } else {

                                            haveRoles.push(parsedRolesByFaction[f].name);

                                        }

                                    } else {

                                        if (global.tornApps.verify.checkIfHasRoleByID(currFactionRole, memberRoles)) {

                                            removeRoles.push({id: currFactionRole, name: parsedRolesByFaction[f].name});

                                        }

                                    }

                                }

                            }
                            //console.log(allGuildRoles);
                            //console.log("Member Position:");
                            //console.log(memberPosition);
                            //console.log("Give Roles:");
                            //console.log(giveRoles);
                            //console.log("Remove Roles:");
                            //console.log(removeRoles);
                            //console.log("Have Roles:");
                            //console.log(haveRoles);

                            try {

                                let role = guildObject.roles.cache.find(role => role.id === guild.verifyrole);
                                if (role) guildObject.members.cache.get(discordID).roles.add(role);

                                for(var t in removeRoles){

                                    let removeRole = guildObject.roles.cache.find(role => role.id === removeRoles[t].id);
                                    if (removeRole) guildObject.members.cache.get(discordID).roles.remove(removeRole);
                                }

                                for(var u in giveRoles){

                                    let giveRole = guildObject.roles.cache.find(role => role.id === giveRoles[u].id);
                                    if (giveRole) guildObject.members.cache.get(discordID).roles.add(giveRole);

                                }

                                if (memberObject !== false) {

                                    let NewNick = memberObject.name + " [" + memberObject.player_id + "]";

                                    member.setNickname(NewNick).catch(console.error);

                                    var roleName = global.tornApps.authFunctions.getRoleNameByID(guild.verifyrole);

                                    var message = "Welcome " + NewNick + "! You have been verified and given the ***@"+roleName+"*** role.";
                                    message += "\n\n";

                                    for (var a in haveRoles){

                                        message += "Given **@"+haveRoles[a]+"** Due to Position: **"+memberPosition+"**\n";

                                    }

                                    for (var o in haveFactionRoles){

                                        message += "Given **@"+haveFactionRoles[o]+"** Due to Faction: "+factionNames[o]+"\n";

                                    }

                                    global.objects.formattedMessage.systemSuccessThenDelete(guild.welcomechannel, "Verification Complete", message, false);
                                }

                            } catch (err) {
                                global.logger.error(err);

                            }

                        }
                    }
                }
            }



        },

        discordLocalTestAssociatedSuccess(control,result){

            var discordID = control.msg.author.id;


            var guild = global.tornApps.authFunctions.returnRegisterByGuildID(control.msg.guild.id);

            global.tornApps.verify.discordVerifyRolesByDiscordID(discordID,guild,result);


        },

        discordLocalTestAssociatedFail(control) {
            var guild = global.tornApps.authFunctions.returnRegisterByGuildID(member.guild.id);

            if (guild.verify === 1) {

                if (guild.welcomechannel !== 0) {


                    var channelID = guild.welcomechannel;


                    var message = "We could not auto-verify you. Please visit https://tornapps.com/frontpage/verify/ and follow the steps to verify yourself.";
                    global.objects.formattedMessage.systemLocalFailThenDelete(control, "Verification Failed", message, false);


                }


            }

        },

        discordLocalAssociatedSuccess(control,result){

            var discordID = control.msg.author.id;
            var guildID = control.msg.guild.id;

            global.tornApps.verify.discordVerifyRolesByDiscordID(discordID,guildID);

        },

        discordLocalAssociatedFail(control) {
            var guild = global.tornApps.authFunctions.returnRegisterByGuildID(member.guild.id);

            if (guild.verify === 1) {

                if (guild.welcomechannel !== 0) {


                    var channelID = guild.welcomechannel;


                    var message = "We could not auto-verify you. Please visit https://tornapps.com/frontpage/verify/ and follow the steps to verify yourself.";
                    global.objects.formattedMessage.systemLocalFailThenDelete(control, "Verification Failed", message, false);


                }


            }

        },
        checkForDiscord: function (discordID, member) {

            var objectInterface = new global.tornApps.objectInterface;

            objectInterface.memberObject.localMemberByDiscordID(discordID, member, global.tornApps.verify.discordAssociatedSuccess, global.tornApps.verify.discordAssociatedFail);

        },

        checkForScheduledDiscord: function (discordID, guildID) {

            var objectInterface = new global.tornApps.objectInterface;
            var data = [];
            data.discordID = discordID;
            data.guildID = guildID;
            objectInterface.memberObject.localMemberByDiscordID(discordID, data, global.tornApps.verify.discordAssociatedSuccess, global.tornApps.verify.discordAssociatedFail);

        },


        discordScheduledAssociatedSuccess(data, result) {

            var discordID = data.discordID;
            var guildID = data.guildID;

            global.tornApps.verify.discordVerifyRolesByDiscordID(discordID,guildID);

        },

        discordScheduledAssociatedFail(data) {
            var guild = global.tornApps.authFunctions.returnRegisterByGuildID(data.guildID);

            if (guild.verify === 1) {

                if (guild.welcomechannel !== 0) {


                    var channelID = guild.adminchannel;


                    var message = "We could not auto-verify you. Please visit https://tornapps.com/frontpage/verify/ and follow the steps to verify yourself.";
                    global.objects.formattedMessage.systemLocalMemberFailThenDelete(member, channelID, "Verification Failed", message, false);


                }


            }

        },


        discordAssociatedSuccess(member, result) {

            var discordID = member.id;
            var guildID = member.guild.id;

            global.tornApps.verify.discordVerifyRolesByDiscordID(discordID,guildID);

        },

        discordAssociatedFail(member) {
            var guild = global.tornApps.authFunctions.returnRegisterByGuildID(member.guild.id);

            if (guild.verify === 1) {

                if (guild.welcomechannel !== 0) {


                    var channelID = guild.welcomechannel;


                    var message = "We could not auto-verify you. Please visit https://tornapps.com/frontpage/verify/ and follow the steps to verify yourself.";
                    global.objects.formattedMessage.systemLocalMemberFailThenDelete(member, channelID, "Verification Failed", message, false);


                }


            }

        }


    }

}


module.exports = verify();