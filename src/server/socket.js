const socketIO = require('socket.io');

module.exports = (server) => {
    const io = socketIO(server);

    io.on('connection', (socket) => {
        console.log('A user connected: ' + socket.id);

        socket.on('draw', (data) => {
            socket.broadcast.emit('draw', data);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected: ' + socket.id);
        });
    });

    return io;
};