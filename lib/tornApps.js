const tornApps = function tornApps() {

    return {

        db: require('../lib/tornApps/db.js'),
        groupAssist: require('../lib/tornApps/groupAssist.js'),
        stats: require('../lib/tornApps/stats.js'),
        war: require('../lib/tornApps/war.js'),
        objectInterface: require('../lib/tornApps/objectInterface.js'),
        authFunctions: require('../lib/tornApps/authFunctions.js'),
        verify: require('../lib/tornApps/verify.js'),
        register: require('../lib/tornApps/register.js')

    }


}

module.exports = tornApps();