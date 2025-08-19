const socketIO = require('socket.io');

module.exports = (server) => {
    const io = socketIO(server);
    
    // Store drawing history for each room
    const roomDrawings = {};

    io.on('connection', (socket) => {
        console.log('A user connected: ' + socket.id);
        
        // Handle room joining
        socket.on('join-room', (roomId) => {
            // Leave previous rooms
            Object.keys(socket.rooms).forEach(room => {
                if (room !== socket.id) {
                    socket.leave(room);
                }
            });
            
            // Join new room
            socket.join(roomId);
            console.log(`User ${socket.id} joined room ${roomId}`);
            
            // Initialize room drawings if needed
            if (!roomDrawings[roomId]) {
                roomDrawings[roomId] = [];
            }
            
            // Send drawing history to new user
            socket.emit('drawing-history', roomDrawings[roomId]);
        });

        // Handle drawing events
        socket.on('drawing', (data) => {
            // Get all rooms the socket is in (excluding the socket's own room)
            const rooms = Object.keys(socket.rooms).filter(room => room !== socket.id);
            
            if (rooms.length > 0) {
                const roomId = rooms[0]; // Use the first room
                
                // Store drawing data
                if (roomDrawings[roomId]) {
                    roomDrawings[roomId].push(data);
                }
                
                // Broadcast to everyone in the room except sender
                socket.to(roomId).emit('drawing', data);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected: ' + socket.id);
        });
    });

    return io;
};