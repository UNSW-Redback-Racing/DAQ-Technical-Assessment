import { tempRead } from "./interface";
import * as fs from 'fs/promises';

const invalidTemps: number[] = [];  // stores timestamps, max length 3 at any time

export const logTemp = async (data: tempRead) => {

    if (data.battery_temperature > 80 || data.battery_temperature < 20) {

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
                await fs.writeFile('incidents.log', incident, { flag: 'a+' });
            }
        }
    } 
}

// for testing
export const clearTemps = () => {
    invalidTemps.length = 0;
}