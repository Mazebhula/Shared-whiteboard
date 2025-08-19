const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Import and use our socket.js module
const io = require('./socket')(server);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/whiteboard', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});