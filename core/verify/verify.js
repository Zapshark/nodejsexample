const verify = (control) => {

    var command = control.command;




    if (command === "verify") {


        var name = control.argsNotSplit;

        var discordID = name;

        if(discordID.replace(/[\\<>@#&!]/g, "") !== ""){
            console.log(discordID.replace(/[\\<>@#&!]/g, ""));
            global.tornApps.verify.checkForcedVerify(discordID.replace(/[\\<>@#&!]/g, ""),control);

        }else{

            global.tornApps.verify.localVerify(control);

        }






    }



    if(command === "listmembers"){


        var members = [];

        var guild = control.msg.guild.members.fetch().then(function (GuildMembers){
            let Guild = Array.from(GuildMembers.values());

            var data = [];
            data.message = "";
            for(var i in Guild){


                data.message = data.message + Guild[i].displayName + " - " + Guild[i].id + "\n";


            }

            global.utilities.discordMsg.sendLocalBasicMessageThenDelete(control,data);



        }).catch(console.error);




    }


};

module.exports = verify;