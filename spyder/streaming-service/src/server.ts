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

// Helper function to handle invalid data 
function validateBatteryData(data: any): any {
  
  // Make sure we have a valid data structure
  if (!data || typeof data.timestamp !== 'number') {
    console.warn("Invalid data structure received:", data);
    return null;
  }

  // Check if data is valid (battery_temperature is a number)
  if (!data || typeof data.battery_temperature !== 'number') {
    console.warn("Invalid data received: ", data);
    return null;
  }

  return {
    battery_temperature: data.battery_temperature, 
    timestamp: data.timestamp
  };
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
        
        // Send validated JSON over WS to clitents
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
