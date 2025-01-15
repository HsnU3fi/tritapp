const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });
let clients = new Set();

server.on('connection', (ws) => {
    clients.add(ws);

    ws.on('message', (message) => {
        // Broadcast پیام دریافتی به همه کلاینت‌ها
        for (let client of clients) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        }
    });

    ws.on('close', () => {
        clients.delete(ws);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
