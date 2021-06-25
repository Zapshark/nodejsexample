const formattedMessage = function formattedMessage() {

    return {

        formattedLocalSuccess: function (localControl, data, doesDelete = true,deleteTimeout = 60000) {

            const messageEmbed = new global.Discord.MessageEmbed()
                .setColor(data.color)
                .setTitle(data.title)

                .setDescription(data.description)
                .setTimestamp();

                if(data.url !== undefined){

                    messageEmbed.setURL(data.url);
                }

            global.utilities.discordMsg.sendLocalFormattedMessage(localControl,messageEmbed,doesDelete,deleteTimeout);

        },

        formattedLocalFail: function (localControl, data, doesDelete = true,deleteTimeout = 60000) {

            const messageEmbed = new global.Discord.MessageEmbed()
                .setColor(data.color)
                .setTitle(data.title)
                .setURL(data.url)
                .setDescription(data.description)
                .setTimestamp()

            global.utilities.discordMsg.sendLocalFormattedMessage(localControl,messageEmbed,doesDelete,deleteTimeout);

        },

        systemLocalFailThenDelete: function (localControl, title,description,doesDelete = true,deleteTimeout = 60000){

            const messageEmbed = new global.Discord.MessageEmbed()
                .setColor("RED")
                .setTitle(title)
                .setDescription(description)
                .setTimestamp()

            global.utilities.discordMsg.sendLocalFormattedMessageThenDelete(localControl,messageEmbed,doesDelete,deleteTimeout);


        },

        systemSuccessThenDelete: function (channelID,title,description,doesDelete = true,deleteTimeout = 60000){


            const messageEmbed = new global.Discord.MessageEmbed()
                .setColor("GREEN")
                .setTitle(title)
                .setDescription(description)
                .setTimestamp()

            var data = [];

            data.formattedMessage = messageEmbed;

            global.utilities.discordMsg.sendFormattedMessage(channelID,data,doesDelete,deleteTimeout);


        },

        systemFailThenDelete: function (channelID,title,description,doesDelete = true,deleteTimeout = 60000){


            const messageEmbed = new global.Discord.MessageEmbed()
                .setColor("RED")
                .setTitle(title)
                .setDescription(description)
                .setTimestamp()

            var data = [];

            data.formattedMessage = messageEmbed;

            global.utilities.discordMsg.sendFormattedMessage(channelID,data,doesDelete,deleteTimeout);


        },

        systemLocalSuccessThenDelete: function (localControl, title,description,doesDelete = true, deleteTimeout = 60000){

            const messageEmbed = new global.Discord.MessageEmbed()
                .setColor("GREEN")
                .setTitle(title)
                .setDescription(description)
                .setTimestamp()

            global.utilities.discordMsg.sendLocalFormattedMessageThenDelete(localControl,messageEmbed,doesDelete,deleteTimeout);


        },
        systemLocalMemberFailThenDelete: function (localMember,channelID, title,description,doesDelete = true,deleteTimeout = 60000){

            const messageEmbed = new global.Discord.MessageEmbed()
                .setColor("RED")
                .setTitle(title)
                .setDescription(description)
                .setTimestamp()

            global.utilities.discordMsg.sendLocalMemberFormattedMessageThenDelete(localMember,channelID,messageEmbed,doesDelete,deleteTimeout);


        },

        systemLocalMemberSuccessThenDelete: function (localMember,channelID, title,description,doesDelete = true, deleteTimeout = 60000){

            const messageEmbed = new global.Discord.MessageEmbed()
                .setColor("GREEN")
                .setTitle(title)
                .setDescription(description)
                .setTimestamp()

            global.utilities.discordMsg.sendLocalMemberFormattedMessageThenDelete(localMember,channelID,messageEmbed,doesDelete,deleteTimeout);


        },

        systemLocalDMFailThenDelete: function (localControl, title,description,doesDelete = true,deleteTimeout = 60000){

            const messageEmbed = new global.Discord.MessageEmbed()
                .setColor("RED")
                .setTitle(title)
                .setDescription(description)
                .setTimestamp()

            var data = [];
            data.formattedMessage = messageEmbed;

            global.utilities.discordMsg.sendLocalFormattedMessageInDM(localControl,data,doesDelete,deleteTimeout);


        },

        systemLocalDMSuccessThenDelete: function (localControl, title,description,doesDelete = true, deleteTimeout = 60000){

            const messageEmbed = new global.Discord.MessageEmbed()
                .setColor("BLUE")
                .setTitle(title)
                .setDescription(description)
                .setTimestamp()

            var data = [];
            data.formattedMessage = messageEmbed;

            global.utilities.discordMsg.sendLocalFormattedMessageInDM(localControl,data,doesDelete,deleteTimeout);


        }



    }

}
module.exports = formattedMessage();