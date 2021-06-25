const tornStatsAPI = function tornStatsAPI(APIKey) {

    const xhr = new XMLHttpRequest();
    const API_Key = APIKey;
    const baseURL = 'https://www.tornstats.com/api.php';


    ///////////////////////////////////////////////
    //                    User
    ///////////////////////////////////////////////
    this.spy = {};

    this.spy.target = (id) => {
        return makeRequest(['spy'],id);
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

    function makeRequest(selections, target) {

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
        let url = baseURL;

        url += '?action=' + selectionString + '&key=' + API_Key;

        if(target !== ""){

            url += '&target=' + target;

        }

        return getRequest(url);
    }


}

module.exports = tornStatsAPI;