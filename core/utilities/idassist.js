const idassist = (control) => {

    var command = control.command;

    if(command === "devids"){

        var channelID = control.msg.channel.id;
        var userID = control.msg.author.id;
        var guildID = control.msg.guild.id;

        var message = "Guild ID: "+guildID+"\n";
        message += "Your ID: "+userID+"\n";
        message += "Channel ID: "+channelID+"\n";

        global.objects.formattedMessage.systemLocalSuccessThenDelete(control,"Your Dev ID Readout",message,false);


    }


}

module.exports = idassist