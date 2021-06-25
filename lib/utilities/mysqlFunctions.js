const mysqlFunctions = function mysqlFunctions() {

    return {

        sortArray: function (results) {

            var sorted = [];

            results = JSON.stringify(results);
            sorted = JSON.parse(results);

            return sorted;


        },
        openMultiple: function () {

            global.mySQLCredentials.multipleStatements = true;
            global.mysqlCon = global.mysql.createConnection(mySQLCredentials);
            global.mysqlCon.connect(function (err) {
                if(err !== null) {
                    global.logger.error("MySQL Error: " + err);
                }
            });

        },

        open: function () {
            global.mysqlCon = global.mysql.createConnection(mySQLCredentials);
            global.mysqlCon.connect(function (err) {
                if(err !== null) {
                    global.logger.error("MySQL Error: " + err);
                }
            });

        },
        close: function () {
            global.mySQLCredentials.multipleStatements = false;
            global.mysqlCon.close();
        },
        formatNumbers: function (amount, decimalCount = 0, decimal = ".", thousands = ",") {
            try {
                decimalCount = Math.abs(decimalCount);
                decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

                const negativeSign = amount < 0 ? "-" : "";

                let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
                let j = (i.length > 3) ? i.length % 3 : 0;

                return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
            } catch (e) {
                global.logger.error(e)
            }
        }

    }

}

module.exports = mysqlFunctions();