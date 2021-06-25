const statChanMessage = function statChanMessage() {


    return {


        myStatsSuccess: function (localControl,result) {

            var data = global.utilities.mysqlFunctions.sortArray(result);
            data = data[0];

            var formatBody = "```css\nBattle Stats for " + data.name + " [" + data.player_id + "]\n\n";
            formatBody = formatBody + "Strength: " + global.utilities.format.formatNumbers(data.strength) + "\n";
            formatBody = formatBody + "Dexterity: " + global.utilities.format.formatNumbers(data.dexterity) + "\n";
            formatBody = formatBody + "Defense: " + global.utilities.format.formatNumbers(data.defense) + "\n";
            formatBody = formatBody + "Speed: " + global.utilities.format.formatNumbers(data.speed) + "\n";
            formatBody = formatBody + "Total: " + global.utilities.format.formatNumbers(data.total) + "\n";
            formatBody = formatBody + "```";
            formatBody = formatBody + "\nLast Updated: " + data.lastupdated.split("T")[0] + " From: https://tornapps.com";
            var send = [];
            send.message = formatBody;
            global.utilities.discordMsg.sendLocalBasicMessageThenDelete(localControl, send);



        },

        myStatsFail: function (localControl) {

            var data = [];
            data.message = "We do not have any stats to show for you. Register at https://tornapps.com and activate the 'My Stats' app.";
            global.utilities.discordMsg.sendLocalBasicMessageThenDelete(localControl,data,true,20000);


        }
    }
}

module.exports = statChanMessage();