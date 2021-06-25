const mystats = (control) => {

    if(control.command === "mystats"){


        const tornApps = new global.tornApps.stats;
        tornApps.mystats.battlestats(control);

    }


}

module.exports = mystats