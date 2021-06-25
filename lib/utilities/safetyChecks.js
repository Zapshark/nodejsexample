const safetyChecks = function safetyChecks()  {

    return {

        guildIsRegistered: function (control) {

            for (var i in global.db.registry){

                if(global.db.registry[i].guild === control.msg.guild.id){

                    if(global.db.registry[i].activated === 1){

                        return true;

                    }

                }

            }

            return false;

        },

        guildExistsNotActive: function (control) {

            for (var i in global.db.registry){

                if(global.db.registry[i].guild === control.msg.guild.id){

                    if(global.db.registry[i].activated === 0){

                        return true;

                    }

                }

            }

            return false;

        }

    }

}

module.exports = safetyChecks();