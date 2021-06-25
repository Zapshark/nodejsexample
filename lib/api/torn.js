const tornAPI = function tornAPI(APIKey) {

    const xhr = new XMLHttpRequest();
    const API_Key = APIKey;
    const baseURL = 'https://api.torn.com';


    ///////////////////////////////////////////////
    //                    User
    ///////////////////////////////////////////////

    this.custom = {};

    this.custom.userCustomize = (id,arrOptions) => {

        return makeRequest(id,'user',arrOptions)

    }

    this.custom.uprofilestats = (id) => {

        return makeRequest(id, 'user', ['profile','personalstats'])

    }

    this.user = {};

    this.user.networth = (id) => {
        return makeRequest(id, 'user', ['networth']);
    }

    this.user.bazaar = (id) => {
        return makeRequest(id, 'user', ['bazaar']);
    }

    this.user.display = (id) => {
        return makeRequest(id, 'user', ['display']);
    }

    this.user.inventory = (id) => {
        return makeRequest(id, 'user', ['inventory']);
    }

    this.user.hof = (id) => {
        return makeRequest(id, 'user', ['hof']);
    }

    this.user.travel = (id) => {
        return makeRequest(id, 'user', ['travel']);
    }

    this.user.events = (id) => {
        return makeRequest(id, 'user', ['events']);
    }

    this.user.messages = (id) => {
        return makeRequest(id, 'user', ['messages']);
    }

    this.user.education = (id) => {
        return makeRequest(id, 'user', ['education']);
    }

    this.user.medals = (id) => {
        return makeRequest(id, 'user', ['medals']);
    }

    this.user.honors = (id) => {
        return makeRequest(id, 'user', ['honors']);
    }

    this.user.notifications = (id) => {
        return makeRequest(id, 'user', ['notifications']);
    }

    this.user.personalstats = (id) => {
        return makeRequest(id, 'user', ['personalstats']);
    }

    this.user.workstats = (id) => {
        return makeRequest(id, 'user', ['workstats']);
    }

    this.user.crimes = (id) => {
        return makeRequest(id, 'user', ['crimes']);
    }

    this.user.icons = (id) => {
        return makeRequest(id, 'user', ['icons']);
    }

    this.user.cooldowns = (id) => {
        return makeRequest(id, 'user', ['cooldowns']);
    }

    this.user.money = (id) => {
        return makeRequest(id, 'user', ['money']);
    }

    this.user.perks = (id) => {
        return makeRequest(id, 'user', ['perks']);
    }

    this.user.battlestats = (id) => {
        return makeRequest(id, 'user', ['battlestats']);
    }

    this.user.bars = (id) => {
        return makeRequest(id, 'user', ['bars']);
    }

    this.user.profile = (id) => {
        return makeRequest(id, 'user', ['profile']);
    }

    this.user.basic = (id) => {
        return makeRequest(id, 'user', ['basic']);
    }

    this.user.attacks = (id) => {
        return makeRequest(id, 'user', ['attacks']);
    }

    this.user.attacksfull = (id) => {
        return makeRequest(id, 'user', ['attacksfull']);
    }

    this.user.stocks = (id) => {
        return makeRequest(id, 'user', ['stocks']);
    }

    this.user.properties = (id) => {
        return makeRequest(id, 'user', ['properties']);
    }

    this.user.jobpoints = (id) => {
        return makeRequest(id, 'user', ['jobpoints']);
    }

    this.user.merits = (id) => {
        return makeRequest(id, 'user', ['merits']);
    }

    this.user.refills = (id) => {
        return makeRequest(id, 'user', ['refills']);
    }

    ///////////////////////////////////////////////
    //                    Torn
    ///////////////////////////////////////////////

    this.torn = {};

    this.torn.items = (id) => {
        return makeRequest(id, 'torn', ['items']);
    }

    this.torn.medals = (id) => {
        return makeRequest(id, 'torn', ['medals']);
    }

    this.torn.honors = (id) => {
        return makeRequest(id, 'torn', ['honors']);
    }

    this.torn.organisedcrimes = (id) => {
        return makeRequest(id, 'torn', ['organisedcrimes']);
    }

    this.torn.gyms = (id) => {
        return makeRequest(id, 'torn', ['gyms']);
    }

    this.torn.companies = (id) => {
        return makeRequest(id, 'torn', ['companies']);
    }

    this.torn.properties = (id) => {
        return makeRequest(id, 'torn', ['properties']);
    }

    this.torn.education = (id) => {
        return makeRequest(id, 'torn', ['education']);
    }

    this.torn.stats = (id) => {
        return makeRequest(id, 'torn', ['stats']);
    }

    this.torn.stocks = (id) => {
        return makeRequest(id, 'torn', ['stocks']);
    }

    this.torn.factiontree = (id) => {
        return makeRequest(id, 'torn', ['factiontree']);
    }

    ///////////////////////////////////////////////
    //                Properties
    ///////////////////////////////////////////////

    this.properties = {};

    this.properties.property = (id) => {
        return makeRequest(id, 'property', ['property']);
    }

    ///////////////////////////////////////////////
    //                  Company
    ///////////////////////////////////////////////

    this.company = {};

    this.company.profile = (id) => {
        return makeRequest(id, 'company', ['profile']);
    }

    this.company.detailed = (id) => {
        return makeRequest(id, 'company', ['detailed']);
    }

    this.company.stock = (id) => {
        return makeRequest(id, 'company', ['stock']);
    }

    this.company.employees = (id) => {
        return makeRequest(id, 'company', ['employees']);
    }

    this.company.news = (id) => {
        return makeRequest(id, 'company', ['news']);
    }

    this.company.newsfull = (id) => {
        return makeRequest(id, 'company', ['newsfull']);
    }

    ///////////////////////////////////////////////
    //                  Market
    ///////////////////////////////////////////////

    this.market = {};

    this.market.bazaar = (id) => {
        return makeRequest(id, 'market', ['bazaar']);
    }
    this.market.itemmarket = (id) => {
        return makeRequest(id, 'market', ['itemmarket']);
    }
    this.market.pointsmarket = (id) => {
        return makeRequest(id, 'market', ['pointsmarket']);
    }

    ///////////////////////////////////////////////
    //                  Faction
    ///////////////////////////////////////////////

    this.faction = {};

    this.faction.basic = (id) => {
        return makeRequest(id, 'faction', ['basic']);
    }

    this.faction.chain = (id) => {
        return makeRequest(id, 'faction', ['chain']);
    }

    this.faction.currency = (id) => {
        return makeRequest(id, 'faction', ['currency']);
    }

    this.faction.weapons = (id) => {
        return makeRequest(id, 'faction', ['weapons']);
    }

    this.faction.armor = (id) => {
        return makeRequest(id, 'faction', ['armor']);
    }

    this.faction.temporary = (id) => {
        return makeRequest(id, 'faction', ['temporary']);
    }

    this.faction.medical = (id) => {
        return makeRequest(id, 'faction', ['medical']);
    }

    this.faction.drugs = (id) => {
        return makeRequest(id, 'faction', ['drugs']);
    }

    this.faction.boosters = (id) => {
        return makeRequest(id, 'faction', ['boosters']);
    }

    this.faction.cesium = (id) => {
        return makeRequest(id, 'faction', ['cesium']);
    }

    this.faction.mainnews = (id) => {
        return makeRequest(id, 'faction', ['mainnews']);
    }

    this.faction.mainnewsfull = (id) => {
        return makeRequest(id, 'faction', ['mainnewsfull']);
    }

    this.faction.attacknews = (id) => {
        return makeRequest(id, 'faction', ['attacknews']);
    }

    this.faction.attacknewsfull = (id) => {
        return makeRequest(id, 'faction', ['attacknewsfull']);
    }

    this.faction.armorynews = (id) => {
        return makeRequest(id, 'faction', ['armorynews']);
    }

    this.faction.armorynewsfull = (id) => {
        return makeRequest(id, 'faction', ['armorynewsfull']);
    }

    this.faction.donationnews = (id) => {
        return makeRequest(id, 'faction', ['donationnews']);
    }

    this.faction.donationnewsfull = (id) => {
        return makeRequest(id, 'faction', ['donationnewsfull']);
    }

    this.faction.crimes = (id) => {
        return makeRequest(id, 'faction', ['crimes']);
    }

    this.faction.attacks = (id) => {
        return makeRequest(id, 'faction', ['attacks']);
    }

    this.faction.attacksfull = (id) => {
        return makeRequest(id, 'faction', ['attacksfull']);
    }

    this.faction.upgrades = (id) => {
        return makeRequest(id, 'faction', ['upgrades']);
    }

    this.faction.stats = (id) => {
        return makeRequest(id, 'faction', ['stats']);
    }

    this.faction.donations = (id) => {
        return makeRequest(id, 'faction', ['donations']);
    }


    ///////////////////////////////
    //  Utilities
    ///////////////////////////////

    function checkError(response) {
        const message = 'API ERROR - ';
        if (response.error !== undefined) {
            switch (response.error.code) {
                case 0:
                    global.logger.error(message + 'Unknown error');
                    break;
                case 1:
                    global.logger.error(message + 'Key is empty');
                    break;
                case 2:
                    global.logger.error(message + 'Incorrect Key');
                    break;
                case 3:
                    global.logger.error(message + 'Wrong type');
                    break;
                case 4:
                    global.logger.error(message + 'Wrong fields');
                    break;
                case 5:
                    global.logger.error(message + 'Too many requests');
                    break;
                case 6:
                    global.logger.error(message + 'Incorrect ID');
                    break;
                case 7:
                    global.logger.error(message + 'Incorrect ID-entity relation');
                    break;
                case 8:
                    global.logger.error(message + 'IP block');
                    break;
                case 9:
                    global.logger.error(message + 'API disabled');
                    break;
                case 10:
                    global.logger.error(message + 'Key owner is in federal jail');
                    break;
                case 11:
                    global.logger.error(message + 'Key change error');
                    break;
                case 12:
                    global.logger.error(message + 'Key read error');
                    break;
                default:
                    global.logger.error(message + 'Unknown Error ID');
                    break;
            }
            return true;
        } else {
            return false;
        }
    }

    function getRequest(url) {
        return new Promise(function (resolve, reject) {

            xhr.open("GET", url, true);

            xhr.onload = function (e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);

                        if (checkError(response) === true) {
                            reject(response.error);
                        } else {
                            resolve(response);
                        }
                        ;

                    } else {
                        reject(Error(xhr.statusText));
                    }
                }
            };

            xhr.onerror = function (e) {
                reject(Error(xhr.statusText));
            };

            xhr.send(null);

        });
    }

    function propertiesToArray(response) {
        const p = response.properties;
        const properties = [];
        for (var key in p) {
            if (p.hasOwnProperty(key)) {
                properties.push({
                    property_id: key,
                    owner_id: p[key].owner_id,
                    property_type: p[key].property_type
                });
            }
        }
        return properties;
    }

    function makeRequest(id, type, selections) {

        // add first item to selection
        let selectionString = selections[0];

        // remove first item
        selections.splice(0, 1);

        // add remaining items
        if (selections.length > 0) {
            selections.forEach(selection => {
                selectionString += (',' + selection);
            });
        }

        // url
        let url = baseURL + '/' + type + '/';
        if (id === undefined) {
            // hi friend ♥
        } else {
            url += id;
        }
        url += '?selections=' + selectionString + '&key=' + API_Key;

        return getRequest(url);
    }


}

module.exports = tornAPI;