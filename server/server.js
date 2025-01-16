import { WebSocketServer } from 'ws'; // استفاده از WebSocketServer به جای WebSocket.Server

const server = new WebSocketServer({ port: 8080 });

server.on('connection', (client) => {
    console.log('New client connected');

    // ارسال پیامی به کلاینت
    client.send('Hello from server');

    // دریافت پیام از کلاینت
    client.on('message', (message) => {
        console.log('Received message from client:', message);
    });

    // مدیریت قطع اتصال کلاینت
    client.on('close', () => {
        console.log('Client disconnected');
    });

    // مدیریت خطا
    client.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
