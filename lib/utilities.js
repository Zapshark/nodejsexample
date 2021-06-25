const utilities = function utilities() {

    return {

        arrays: require('../lib/utilities/arrays.js'),
        discordMsg: require('../lib/utilities/discordMsg.js'),
        format: require('../lib/utilities/format.js'),
        mysqlFunctions: require('../lib/utilities/mysqlFunctions.js'),
        safetyChecks: require('../lib/utilities/safetyChecks.js'),
        preloadWarmup: require('../lib/utilities/preloadWarmup.js')

    }


}

module.exports = utilities();