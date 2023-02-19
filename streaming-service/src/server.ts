import fs from "fs";
import net from 'net';
import { WebSocket, WebSocketServer } from 'ws';

const TCP_PORT = parseInt(process.env.TCP_PORT || '12000', 10);

const tcpServer = net.createServer();
const websocketServer = new WebSocketServer({ port: 8080 });

/**
 * Returns true if `item` is json valid
 * @param item string to check if json
 * @returns true if `item` is a valid json
 */
const isJSON = (item: string): boolean => {
    item = typeof item !== "string" ? JSON.stringify(item) : item;

    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }

    if (typeof item === "object" && item !== null) {
        return true;
    }
    return false;
}

/**
 * Checks if an object contains all keys in `fields`
 * @param body request body
 * @param fields fields to check
 * @returns true if body contains all fields specified in `fields`
 */
export const isValidObject = <T extends Record<string, unknown>>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any,
    fields: Array<keyof T>,
): body is T => {
    return Object.keys(body).every((key) => fields.includes(key));
};

type DataPacket = {
    battery_temperature: number,
    timestamp: number, // integer
}

let incidents: DataPacket[] = [];

tcpServer.on('connection', (socket) => {
    console.log('TCP client connected');
    socket.on('data', (msg) => {
        console.log(msg.toString());



        if (isJSON(msg.toString())) {
            const currJSON = JSON.parse(msg.toString());
            if (isValidObject<DataPacket>(currJSON, ["battery_temperature", "timestamp"])) {
                const dataPacket = currJSON;
                if (dataPacket.battery_temperature > 80) {
                    incidents.push(dataPacket);
                }
            } else {
                console.error("Last message was missing keys!");
            }
        } else {
            console.error("Last message was not JSON valid!");
        }
        // console.log(incidents.length);
        if (incidents.length >= 3) {
            // Get the first 3
            console.log("more than 3");
            const incident1 = incidents[0]
            const incident2 = incidents[1]
            const incident3 = incidents[2]

            if (Math.abs(incident3.battery_temperature - incident1.battery_temperature) < 5000) {
                console.log(incident1, incident2, incident3);
                // Current most timestamp should be incident3 (as in order)
                fs.appendFile("incident.log", incident3.timestamp + '\n', (err) => {
                    if (err) {
                        console.error("Error writing to file, incident.log");
                    }
                })
                incidents.pop();
                incidents.pop();
                incidents.pop();
            }
        }
        // Purge incident if older than 5 seconds
        if (incidents.length >= 1) {
            const incident1 = incidents[0];
            const timestamp = new Date().getTime();
            // console.log(Math.abs(timestamp - incident1.timestamp));
            if (Math.abs(timestamp - incident1.timestamp) >= 5000) {
                const purge = incidents.pop() as DataPacket;
                // console.log("purging after 5 seconds, " + (purge.timestamp - timestamp));
            }
        }




        websocketServer.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(msg.toString());
            }
        });
    });

    socket.on('end', () => {
        console.log('Closing connection with the TCP client');
    });

    socket.on('error', (err) => {
        console.log('TCP client error: ', err);
    });
});

websocketServer.on('listening', () => console.log('Websocket server started'));

websocketServer.on('connection', async (ws: WebSocket) => {
    console.log('Frontend websocket client connected to websocket server');
    ws.on('error', console.error);
});

tcpServer.listen(TCP_PORT, () => {
    console.log(`TCP server listening on port ${TCP_PORT}`);
});


