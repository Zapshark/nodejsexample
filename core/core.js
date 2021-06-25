const commands = function commands(){

    return {

        stats: require('../core/stats.js'),
        test: require('../core/test.js'),
        register: require('../core/register.js'),
        war: require('../core/war.js'),
        utilities: require('../core/utilities.js'),
        verify: require('../core/verify.js')

    }


}

module.exports = commands();