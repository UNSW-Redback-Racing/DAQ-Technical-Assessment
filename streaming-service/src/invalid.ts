import { tempRead } from "./interface";
import fs from "fs";

const invalidTemps: number[] = [];  // stores timestamps, max length 3 at any time

export const logTemp = (data: tempRead) => {

    if (data.battery_temperature > 80) {

        invalidTemps.push(data.timestamp);

        // ensures max length 3
        if (invalidTemps.length > 3) {
            invalidTemps.shift();
        }

        // compare most recent error with third last
        if (invalidTemps.length == 3) {

            const secondsDiff = Math.floor((data.timestamp - invalidTemps[0]) / 1000);
            
            if (secondsDiff <= 5) {
                const incident = data.timestamp + '\n';
                fs.writeFileSync('incidents.log', incident, { flag: 'a+' });
            }
        }
    } 
}