const objectInterface = function objectInterface() {

    this.memberObject = {};


    this.memberObject.localMemberByID = (memberID,control,callback,errorCallBack) => {

        return makeLocalSingleSelectRequest("memberobjects","player_id",memberID,"*",control,callback,errorCallBack);

    }

    this.memberObject.localMemberByDiscordID = (discordID,control,callback,errorCallBack) => {

        return makeLocalSingleSelectRequest("memberobjects","discordid",discordID,"*",control,callback,errorCallBack);

    }



    async function makeLocalSingleSelectRequest(table,where,value,columns,control,callback,errorCallBack){


        try {


            global.utilities.mysqlFunctions.open();
            global.mysqlCon.query("SELECT " + columns + " FROM " + table + " WHERE " + where + "='" + value + "'", function (error, result, fields) {

                var fixResults = global.utilities.mysqlFunctions.sortArray(result);

                if(fixResults.length === 1){

                    callback(control,fixResults);

                    return true;

                }else{

                    errorCallBack(control);

                    return false;

                }


            });

        }
        catch (err){
            global.logger.error(err);
        }

    }

}

module.exports = objectInterface;