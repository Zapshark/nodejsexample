const warPM = (control) => {

    var command = control.command;


    if(command === "setwarpass"){


        global.tornApps.war.setWarPass(control);

    }

    if(command === "stopwar"){

        var warID = global.tornApps.authFunctions.returnWarIDbyUserID(control);

        if(warID !== false){

            global.tornApps.war.deleteWar(control);

        }

    }

    if(command === "joinwar"){

        var password = control.argsNotSplit;

        global.tornApps.war.joinWarByPassword(control,password);


    }

    if(command === "addtarget"){

        var targetFactionID = control.argsNotSplit;

        if(targetFactionID.length > 2){

            if(global.tornApps.authFunctions.checkIfWarLeader(control)){

                global.tornApps.war.addNewWarTarget(control,targetFactionID);

            }

        }


    }

    if(command === "removetarget"){

        var targetFactionID = control.argsNotSplit;

        if(targetFactionID.length > 2){
            targetFactionID = targetFactionID.trim();
            targetFactionID = targetFactionID.valueOf();
            if(global.tornApps.authFunctions.checkIfWarLeader(control)){

                var warID = global.tornApps.authFunctions.returnWarIDbyUserID(control);

                if(global.tornApps.war.checkIfTargetExists(warID,targetFactionID)) {

                    global.tornApps.war.removeWarTarget(control, targetFactionID);
                }else{

                    global.objects.formattedMessage.systemLocalDMFailThenDelete(control,"Can't find Target to Remove","No target by that faction exists for this war.",false);

                }

            }

        }


    }



}

module.exports = warPM;