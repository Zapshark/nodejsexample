const arrays = function arrays() {

    return {

        arrAddWithID: function (key, value, array) {

            array[key] = value;

        },

        arrAddObject: function (key, value, array) {

            array.push(value);

        },

        arrDeepAdd: function (idkey, idvalue, key, value, array) {

            if (this.arrCheckExist(idkey, idvalue, array))
                this.arrDeepEdit(idkey, idvalue, key, value, array);

            if (!this.arrCheckExist(idkey, idvalue, array)) {
                array.push({[idkey]: idvalue, [key]: value});


            }

        },

        arrDeepEdit: function (idkey, idvalue, key, value, array) {

            for (var i in array) {
                if (array[i][idkey] === idvalue) {

                    array[i][key] = value;
                    break;
                }

            }


        },

        arrCheckExist: function (idkey, idvalue, array) {


            for (var i in array) {
                if (array[i][idkey] === idvalue) {

                    return true;

                }
            }

            return false;

        },

        searchAllByKey: function (arr,key,val) {

            var indexes = [];

            arr.forEach(function (value,index){

                if(value[key] === val){

                    indexes.push(value);

                }

            });

            return indexes;


        }
    }

}

module.exports = arrays();