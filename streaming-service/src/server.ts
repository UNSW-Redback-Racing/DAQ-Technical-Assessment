import net from "net";
import { WebSocket, WebSocketServer } from "ws";
import fs from "fs";

const TCP_PORT = parseInt(process.env.TCP_PORT || "12000", 10);

const tcpServer = net.createServer();
const websocketServer = new WebSocketServer({ port: 8080 });

const MAX_TEMP = 80;
const MIN_TEMP = 20;

let recentOverheats: number[] = [];

function processTemperatureData(temperature: number, timestamp: number) {
    if (temperature > MAX_TEMP || temperature < MIN_TEMP) {
        recentOverheats.push(timestamp);

        // Filter out timestamps older than 5 seconds
        recentOverheats = recentOverheats.filter(
            (timestamp) => Date.now() - timestamp <= 5000
        );

        console.log(recentOverheats.length);

        if (recentOverheats.length > 3) {
            logIncident(timestamp);
        }
    }
}

function logIncident(timestamp: number) {
    const date = new Date(timestamp);
    fs.appendFileSync("incidents.log", `Incident at: ${date.toISOString()}\n`);
}

tcpServer.on("connection", (socket) => {
    console.log("TCP client connected");

    socket.on("data", (msg) => {
        console.log(msg.toString());

        try {
            let currJSON = JSON.parse(msg.toString());
            processTemperatureData(
                currJSON.battery_temperature,
                currJSON.timestamp
            );
        } catch (e) {
            console.log(e);
        }

        websocketServer.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(msg.toString());
            }
        });
    });

    socket.on("end", () => {
        console.log("Closing connection with the TCP client");
    });

    socket.on("error", (err) => {
        console.log("TCP client error: ", err);
    });
});

websocketServer.on("listening", () => console.log("Websocket server started"));

websocketServer.on("connection", async (ws: WebSocket) => {
    console.log("Frontend websocket client connected to websocket server");
    ws.on("error", console.error);
});

tcpServer.listen(TCP_PORT, () => {
    console.log(`TCP server listening on port ${TCP_PORT}`);
});
