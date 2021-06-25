const db = function db(){

    this.Select = {};

    this.Raw = {};


    this.Select.basicSelect = (columns,table,where,value,callback) => {

        return makeSelectRequest(table,where,value,columns,callback)

    }

    this.Raw.Query = (query,callback) => {

        return makeRawQuery(query,callback);

    }


    async function makeSelectRequest(table,where,value,columns,callback){


        global.utilities.mysqlFunctions.open();

        global.mysqlCon.query("SELECT "+columns+" FROM "+table+" WHERE "+where+"='"+value+"'", function (error,result,fields) {
            if(error) throw error;

            callback(result);



            return result;

        });



    }

    async function makeRawQuery(query,callback){


        global.utilities.mysqlFunctions.open();

        global.mysqlCon.query(query, function (error,result,fields) {
            if(error) throw error;

            callback(result);



            return result;

        });



    }


}

module.exports = db();