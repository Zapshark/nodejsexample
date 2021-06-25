const stats = function stats() {

    this.mystats = {};

    this.mystats.battlestats = (control) => {

        makeLocalSelectRequest("mystats","memberobjects","discordid",control.msg.author.id,"player_id,name,strength,speed,dexterity,defense,total,lastupdated",control);

    }

    async function makeLocalSelectRequest(type,table,where,value,columns,control){


        try {


            global.utilities.mysqlFunctions.open();
            global.mysqlCon.query("SELECT " + columns + " FROM " + table + " WHERE " + where + "='" + value + "'", function (error, result, fields) {

                if(type === "mystats") {
                    if (result.length > 0) {

                        global.objects.statChanMessage.myStatsSuccess(control, result);
                    }else{

                        global.objects.statChanMessage.myStatsFail(control);
                    }
                }

            });

        }
        catch (err){
            global.logger.error(err);
        }

    }

}

module.exports = stats;