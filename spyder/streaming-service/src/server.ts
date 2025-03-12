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

const SAFE_TEMP_MIN = 20;
const SAFE_TEMP_MAX = 80;
const MAX_ALERTS = 3;
const MONITORING_WINDOW_MS = 5000; // 5 seconds
const tempAlerts: number[] = [];

 /**
   * Function to handle invalid data. 
   */
function validateBatteryData(data: VehicleData): VehicleData | null {
  if (!data || typeof data.timestamp !== 'number') {
    console.warn("Invalid data structure received:", data);
    return null;
  }

  if (!data || typeof data.battery_temperature !== 'number') {
    console.warn("Invalid data received: ", data);
    return null;
  }

  return {
    battery_temperature: data.battery_temperature, 
    timestamp: data.timestamp
  };
}

 /**
   * Function to monitor battery temperature.
   */
function monitorBatteryTemp(data: VehicleData): void {
  const {battery_temperature, timestamp} = data;

  if (typeof battery_temperature === 'number' && (battery_temperature < SAFE_TEMP_MIN || battery_temperature > SAFE_TEMP_MAX)) {
    tempAlerts.push(timestamp);

    const cutoffTime = timestamp - MONITORING_WINDOW_MS;
    while (tempAlerts.length > 0 && tempAlerts[0] < cutoffTime) {
      tempAlerts.shift();
    }

    if (tempAlerts.length > MAX_ALERTS) {
      console.log(`${new Date(timestamp).toISOString()}: Battery temperature has exceeded safe range too frequently.`);
    }
  }
}

tcpServer.on("connection", (socket) => {
  console.log("TCP client connected");

  socket.on("data", (msg) => {
    try {
      const message: string = msg.toString();
      console.log(`Received: ${message}`);
      
      // Parse and validate the data
      const parsedData = JSON.parse(message);
      const validatedData = validateBatteryData(parsedData);
      
      // Only send valid data to UI
      if (validatedData) {
        const validJsonString = JSON.stringify(validatedData);
        
        // Monitor battery temperature
        monitorBatteryTemp(validatedData);
        
        // Send validated JSON over WS to clients
        websocketServer.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(validJsonString);
          }
        });
      } else {
        console.log("Invalid data filtered out");
      }
    } catch (error) {
      console.error("Error processing data:", error);
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
