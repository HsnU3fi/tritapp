export default ({ app }, inject) => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
        console.log('WebSocket connected');
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    inject('socket', socket);
};
