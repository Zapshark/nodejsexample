const sync = (control) => {


    if (control.command === "refresh") {


        if (global.utilities.safetyChecks.guildIsRegistered(control)) {

            var roles = control.msg.guild.roles.cache.sort((a, b) => b.position - a.position).map(r => r);

            var guildID = control.msg.guild.id;



            try {

                let channels = global.client.channels.cache.array();
                var chanArray = [];

                for (const channel of channels) {

                    if (channel.type === "text") {

                        if(channel.guild.id === guildID) {

                            chanArray.push({id: channel.id, name: channel.name});
                        }
                    }

                }

            } catch (err) {
                global.logger.error(err);
            }



            global.tornApps.register.syncChannels(chanArray, guildID);
            global.tornApps.register.syncRoles(roles, guildID);

            global.objects.formattedMessage.systemLocalSuccessThenDelete(control, "Refresh Complete", "You have successfully synced all Discord information to TornApps. View your dashboard at https://tornapps.com/apps/tappsybot/ ");

        } else {

            global.objects.formattedMessage.systemLocalFailThenDelete(control, "Refresh Failed.", "You must register and activate your bot at https://tornapps.com by adding the Tappsy Discord Bot App.");

        }

    }

    if (control.command === "firstsync") {

        global.tornApps.register.preRegister(control);


    }


};


module.exports = sync;