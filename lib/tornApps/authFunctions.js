const authFunctions = function authFunctions() {

    return {


        returnFactionNameByID: function (factionid){


            for(var i in global.db.factionObjects){

                if(global.db.factionObjects[i].faction_id === factionid){

                    return global.db.factionObjects[i].faction_name;

                }

            }

        },

        getRoleNameByID: function (roleid){

            for(var i in global.db.guildcache.roles){

                if(global.db.guildcache.roles[i].roleid === roleid){

                    return global.db.guildcache.roles[i].rolename;

                }

            }

        },

        checkIfInMemberObjects: function (discordID){

            for(var i in global.db.memberObjects){

                if(global.db.memberObjects[i].discordid === discordID){

                    return true;

                }

            }

            return false;

        },

        returnMemberObjectByDiscordID: function (discordID){

            for(var i in global.db.memberObjects){

                if(global.db.memberObjects[i].discordid === discordID){

                    return global.db.memberObjects[i];

                }

            }

            return false;

        },

        checkIfCleanAPI: function(APIKey){

            if(APIKey.length > 6) {

                for (var i in global.db.blacklistapi) {

                    if (global.db.blacklistapi[i].apikey === APIKey) {

                        return false;

                    }

                }
            }else{

                return false;

            }

            return true;

        },


        checkIfCanUseGA: function (control){

            var guildID = this.returnGuildID(control);

            for(var i in global.db.registry){

                if(global.db.registry[i].guild === guildID){

                    if(global.db.registry[i].allowga === 1){

                        return true;

                    }else{

                        return false;

                    }

                }

            }

            return false;

        },

        returnRegisteredIDByFactionID: function (factionID){

            var registeredID = 0;

            for(var i in global.track.wars.gafactionassoc){

                if(global.track.wars.gafactionassoc[i].factionid === factionID){

                    registeredID = global.track.wars.gafactionassoc[i].registeredid;
                    break;

                }

            }

            return registeredID;


        },

        returnAllRegisteredIDByFactionID: function (factionID){

            var registeredID = [];

            for(var i in global.track.wars.gafactionassoc){

                if(global.track.wars.gafactionassoc[i].factionid === factionID){

                    registeredID.push(global.track.wars.gafactionassoc[i].registeredid);


                }

            }

            return registeredID;


        },

        returnRegisterByRegisterID: function (registeredID){

            for(var i in global.db.registry){

                if(global.db.registry[i].id===registeredID){

                    return global.db.registry[i];

                }

            }

        },
        returnRegisterByGuildID: function (guildID){

            for(var i in global.db.registry){

                if(global.db.registry[i].guild===guildID){

                    return global.db.registry[i];

                }

            }

        },

        checkForGANonWarPermission: function (factionID){

            if(this.checkForGAPermission){

                var registeredID = global.tornApps.authFunctions.returnRegisteredIDByFactionID(factionID);

                for(var i in global.db.registry){

                    if(global.db.registry[i].id === registeredID){

                        if(global.db.registry[i].allownonwarga === 1){

                            return true;

                        }

                    }

                }

                return false;

            }else{

                return false;

            }

        },

        checkForGAPermission: function (factionID){

            if(this.checkForGAAssociation(factionID)){

                var registeredID = global.tornApps.authFunctions.returnRegisteredIDByFactionID(factionID);

                if(registeredID!==0){

                    for(var i in global.db.registry){

                        if(global.db.registry[i].id === registeredID){

                            if(global.db.registry[i].allowga===1){

                                return true;

                            }

                        }

                    }

                    return false;

                }else{

                    return false;

                }

            }

        },



        checkForGAAssociation: function (factionID){

            for(var i in global.track.wars.gafactionassoc){

                if(global.track.wars.gafactionassoc[i].factionid === factionID){

                    return true;

                }

            }

            return false;

        },

        returnRegisteredID: function (control){

            var guildID = this.returnGuildID(control);

            for(var i in global.db.registry){

                if(global.db.registry[i].guild === guildID){

                    return global.db.registry[i].id;

                }

            }

            return false;

        },

        returnFactionIDByControl: function (control){

            var discordID = control.msg.author.id;

            for(var i in global.db.memberObjects){

                if(global.db.memberObjects[i].discordid === discordID){

                    return global.db.memberObjects[i].faction_id;

                }

            }

            return 0;

        },

        checkIfLeaderByControl: function (control){

            var position = this.returnPositionByControl(control);

            if(position !== false) {

                if (position === "Leader") {

                    return true;

                }

                if (position === "Co-leader") {

                    return true;

                }

            }

            return false;


        },

        checkIfRegisteredTornAppsUser: function (control) {

            var user = this.returnUserByControl(control);

            if(user !== false){

                return true;

            }else{

                return false;

            }

        },

        returnUserByControl: function(control){

            var player_id = this.returnPlayerIDByControl(control);

            if(player_id !== false){

                for(var i in global.db.users){

                    if(global.db.users[i].player_id === player_id){

                        return global.db.users[i];

                    }

                }

            }

            return false;

        },

        returnPlayerIDByControl: function (control) {

            if(this.checkIfInMemberObjects(control.msg.author.id)){

                for(var i in global.db.memberObjects){

                    if(global.db.memberObjects[i].discordid === control.msg.author.id){

                        return global.db.memberObjects[i].player_id;

                    }

                }

            }

            return false;

        },

        returnPositionByControl: function (control){

            var discordID = control.msg.author.id;

            for(var i in global.db.memberObjects){

                if(global.db.memberObjects[i].discordid === discordID){

                    return global.db.memberObjects[i].position;

                }

            }

            return false;

        },

        returnGuildID: function (control){

            return control.msg.guild.id;

        },


        checkIfWarLeader: function (control){

            var id = control.msg.author.id;

            for(var i in global.track.wars.monitor){

                if(global.track.wars.monitor[i].createdby === id){

                    return true;

                }

            }

            return false;

        },

        returnWarIDbyUserID: function (control){

            var id = control.msg.author.id;

            for(var i in global.track.wars.monitor){

                if(global.track.wars.monitor[i].createdby === id){

                    return global.track.wars.monitor[i].id;

                }

            }

            return false;

        },

        checkIfBotAdmin: function (control) {

            var id = control.msg.author.id;
            var guildID = control.msg.guild.id;

            for(var i in global.db.registry){

                if(global.db.registry[i].guild===guildID){

                    if(global.db.registry[i].adminone === id){

                        return true;

                    }
                    if(global.db.registry[i].admintwo === id){

                        return true;

                    }
                    if(global.db.registry[i].adminthree === id){

                        return true;

                    }

                }

            }

            return false;

        }



    }


}

module.exports = authFunctions();