// plugins/websocket.js
export default ({ app }, inject) => {
    // اطمینان از اجرای کد فقط در سمت کلاینت
    if (process.client) {
        const socket = new WebSocket('ws://localhost:8080');

        socket.onopen = () => {
            console.log("WebSocket connection established.");
        };

        socket.onmessage = (event) => {
            console.log("Received message:", event.data);
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed.");
        };

        // تزریق socket به app context
        inject('socket', socket);
    }
};
