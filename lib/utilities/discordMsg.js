const discordMsg = function discordMsg() {

    return {

        getMessage: function (channelID,messageID,callback,data) {

            var msg = global.client.channels.cache.get(channelID).messages.fetch(messageID).then(message => {
                callback(message,data);
            }).catch(console.error);


        },

        deleteLocalCommand: function (localControl,deleteTimeout = 10){

            localControl.message.delete({timeout: deleteTimeout});

        },

        deleteMessage: function (channelID,messageID,deleteTimeout = 60000){

            var msg = global.client.channels.cache.get(channelID).messages.fetch(messageID).then(message => {
                message.delete({timeout: deleteTimeout});
            }).catch(console.error);

        },

        sendLocalBasicMessage: function (localControl,data,doesDelete = true,deleteTimeout = 60000){


            try {
                localControl.msg.channel.send(data.message).then(sent => {

                    if (doesDelete) {
                        sent.delete({timeout: deleteTimeout}).catch(console.error);
                    }

                }).catch(console.error);
            }
            catch (err) {
                global.logger.error(err);
            }

        },

        sendLocalBasicMessageInDM: function (localControl,data,doesDelete = true,deleteTimeout = 60000){


            try {
                localControl.msg.author.send(data.message).then(sent => {

                    if (doesDelete) {
                        sent.delete({timeout: deleteTimeout}).catch(console.error);
                    }

                }).catch(console.error);
            }
            catch (err) {
                global.logger.error(err);
            }

        },
        sendLocalFormattedMessageInDM: function (localControl,data,doesDelete = true,deleteTimeout = 60000){


            try {
                localControl.msg.author.send(data.formattedMessage).then(sent => {

                    if (doesDelete) {
                        sent.delete({timeout: deleteTimeout}).catch(console.error);
                    }

                }).catch(console.error);
            }
            catch (err) {
                global.logger.error(err);
            }

        },

        sendBasicMessageInDM: function (id,data,doesDelete = true,deleteTimeout = 60000){


            try {
                global.client.users.cache.get(id).send(data.message).then(sent => {

                    if (doesDelete) {
                        sent.delete({timeout: deleteTimeout}).catch(console.error);
                    }

                }).catch(console.error);
            }
            catch (err) {
                global.logger.error(err);
            }

        },


        sendLocalBasicMessageInDMThenDelete: function (localControl,data,doesDelete = true,deleteTimeout = 60000){


            try {
                localControl.msg.author.send(data.message).then(sent => {

                    if (doesDelete) {
                        sent.delete({timeout: deleteTimeout}).catch(console.error);
                    }

                    localControl.msg.delete({timeout:5000}).catch(console.error);
                }).catch(console.error);
            }
            catch (err) {
                global.logger.error(err);
            }

        },
        sendLocalBasicMessageInDMThenDeleteDM: function (localControl,data,doesDelete = true,deleteTimeout = 60000){


            try {
                localControl.msg.author.send(data.message).then(sent => {

                    if (doesDelete) {
                        sent.delete({timeout: deleteTimeout}).catch(console.error);
                    }

                    localControl.msg.delete({timeout:5000});
                }).catch(console.error);
            }
            catch (err) {
                global.logger.error(err);
            }

        },

        sendLocalBasicMessageThenDelete: function (localControl,data,doesDelete = true,deleteTimeout = 60000){


            try {
                localControl.msg.channel.send(data.message).then(sent => {

                    if (doesDelete) {
                        sent.delete({timeout: deleteTimeout}).catch(console.error);
                    }
                    localControl.msg.delete({timeout:3000});
                }).catch(console.error);
            }
            catch (err) {
                global.logger.error(err);
            }

        },

        sendLocalFormattedMessage: function (localControl,data,doesDelete = true,deleteTimeout = 60000){

            try {

                localControl.msg.channel.send(data).then(sent => {
                    if(doesDelete){
                        sent.delete({timeout: deleteTimeout}).catch(console.error);
                    }

                }).catch(console.error);

            }
            catch (err) {
                global.logger.error(err);
            }


        },

        sendLocalFormattedMessageThenDelete: function (localControl,data,doesDelete = true,deleteTimeout = 60000){

            try {

                localControl.msg.channel.send(data).then(sent => {
                    if(doesDelete){
                        sent.delete({timeout: deleteTimeout}).catch(console.error);
                    }

                }).catch(console.error);

                localControl.msg.delete({timeout:3000}).catch(console.error);

            }
            catch (err) {
                global.logger.error(err);
            }


        },
        sendLocalMemberFormattedMessageThenDelete: function (localMember,channelID,data,doesDelete = true,deleteTimeout = 60000){

            try {

                client.channels.fetch(channelID)
                    .then(channel => {

                        channel.send(data).then(sent => {

                            if (doesDelete) {
                                sent.delete({timeout: deleteTimeout}).catch(console.error);
                            }

                        }).catch(console.error);
                    });

            }
            catch (err) {
                global.logger.error(err);
            }


        },

        sendBasicMessage: function (channelID,data,doesDelete = true,deleteTimeout = 60000){

            try {

                client.channels.fetch(channelID)
                    .then(channel => {

                        channel.send(data.message).then(sent => {

                            if (doesDelete) {
                                sent.delete({timeout: deleteTimeout}).catch(console.error);
                            }

                        }).catch(console.error);
                    });

            }
            catch (err) {
                global.logger.error(err);
            }

        },

        sendFormattedMessage: function (channelID,data,doesDelete = true,deleteTimeout = 60000){

            try {

                client.channels.fetch(channelID)
                    .then(channel => {

                        channel.send(data.formattedMessage).then(sent => {

                            if (doesDelete) {
                                sent.delete({timeout: deleteTimeout}).catch(console.error);
                            }

                        }).catch(console.error);
                    });

            }
            catch (err) {
                global.logger.error(err);
            }

        },


        sendGroupAssistMessage: function (channelID,data,defenderID){

            try {

                client.channels.fetch(channelID)
                    .then(channel => {

                        channel.send(data.formattedMessage).then(sent => {

                            var messageID = sent.id;

                            var results = global.tornApps.war.addNewDefender(defenderID,channelID,messageID);



                        }).catch(console.error);
                    });

            }
            catch (err) {
                global.logger.error(err);
            }

        }

    }


}

module.exports = discordMsg();