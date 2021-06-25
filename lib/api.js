const api = function api() {

    return {

        tornAPI: require('../lib/api/torn'),
        tornStats: require('../lib/api/tornstats')

    }

}

module.exports = api();