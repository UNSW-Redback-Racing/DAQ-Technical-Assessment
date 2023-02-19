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

tcpServer.on('connection', (socket) => {
    console.log('TCP client connected');

    socket.on('data', (msg) => {
        console.log(msg.toString());

        // HINT: what happens if the JSON in the received message is formatted incorrectly?
        // HINT: see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
        if (isJSON(msg.toString())) {
            const currJSON = JSON.parse(msg.toString());
        } else {
            console.error("Last message was not JSON valid!");
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


