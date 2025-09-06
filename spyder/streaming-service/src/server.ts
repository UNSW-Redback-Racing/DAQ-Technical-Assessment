import net from "net";
import { WebSocket, WebSocketServer } from "ws";

interface VehicleData {
  battery_temperature: number | string;
  timestamp: number;
}

const TCP_PORT = 12000;
const WS_PORT = 8080;
const tcpServer = net.createServer();
const websocketServer = new WebSocketServer({ port: WS_PORT });


let outOfRangeEvents: number[] = [];
const RANGE_MIN = 20;
const RANGE_MAX = 80;
const WINDOW_MS = 5000;
const MAX_EVENTS = 3;

tcpServer.on("connection", (socket) => {
  console.log("TCP client connected");

  socket.on("data", (msg) => {
    const message: string = msg.toString();

    console.log(`Received: ${message}`);

    try {
      const data: VehicleData = JSON.parse(message);

      // check type is number not string
      if (typeof data.battery_temperature === "number" && typeof data.timestamp === "number") {
        const temp = data.battery_temperature;
        // Only send valid data
        websocketServer.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
          }
        });

        // Check range
        if (temp < RANGE_MIN || temp > RANGE_MAX) {
          // Record the event timestamp
          outOfRangeEvents.push(data.timestamp);

          // Keep only events in last 5 seconds
          const cutoff = data.timestamp - WINDOW_MS;
          outOfRangeEvents = outOfRangeEvents.filter(t => t >= cutoff);

          // If more than 3 in last 5 seconds then log error
          if (outOfRangeEvents.length > MAX_EVENTS) {
            console.error(`[${new Date(data.timestamp).toISOString()}] ERROR: Battery temperature exceeded safe range more than 3 times in 5s`);
            // reset events to avoid spamming
            outOfRangeEvents = [];
          }
        }
      } else {
        console.warn("Dropping invalid data:", data);
      }
    } catch (err) {
      console.error("Failed to parse incoming data:", err);
    }
  });

  socket.on("end", () => {
    console.log("Closing connection with the TCP client");
  });

  socket.on("error", (err) => {
    console.log("TCP client error: ", err);
  });
});

websocketServer.on("listening", () =>
  console.log(`Websocket server started on port ${WS_PORT}`)
);

websocketServer.on("connection", async (ws: WebSocket) => {
  console.log("Frontend websocket client connected");
  ws.on("error", console.error);
});

tcpServer.listen(TCP_PORT, () => {
  console.log(`TCP server listening on port ${TCP_PORT}`);
});
