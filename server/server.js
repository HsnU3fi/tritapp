import { WebSocketServer } from 'ws';

const server = new WebSocketServer({ port: 8080 });

server.on('connection', (client) => {
    console.log('New client connected');

    client.send('Hello from server');

    client.on('message', (message) => {
        console.log('Received message from client:', message);
    });

    client.on('close', () => {
        console.log('Client disconnected');
    });

    client.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
