const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');
const socket = io();

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables to track drawing state
let drawing = false;
let current = { x: 0, y: 0 };

// Get room ID from URL or generate a random one
let roomId = new URLSearchParams(window.location.search).get('room');
if (!roomId) {
    roomId = Math.random().toString(36).substring(2, 15);
    // Update URL with room ID without reloading the page
    window.history.pushState({ roomId }, '', `?room=${roomId}`);
}

// Join the room
socket.emit('join-room', roomId);

// Display room info
const roomInfo = document.createElement('div');
roomInfo.className = 'room-info';
roomInfo.innerHTML = `Room: ${roomId} <button id="copy-link">Copy Link</button>`;
document.body.appendChild(roomInfo);

// Copy link functionality
document.getElementById('copy-link').addEventListener('click', () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard! Share it with others to collaborate.');
    });
});

// Start drawing
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    current.x = e.clientX;
    current.y = e.clientY;
});

// Stop drawing
canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath();
});

// Draw on canvas
canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;

    const newX = e.clientX;
    const newY = e.clientY;

    draw(current.x, current.y, newX, newY);
    current.x = newX;
    current.y = newY;

    // Emit drawing event to server
    socket.emit('drawing', { x: current.x, y: current.y, newX, newY });
});

// Draw function
function draw(x, y, newX, newY) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(newX, newY);
    ctx.stroke();
}

// Listen for drawing events from other clients
socket.on('drawing', (data) => {
    draw(data.x, data.y, data.newX, data.newY);
});

// Handle drawing history when joining a room
socket.on('drawing-history', (history) => {
    history.forEach(data => {
        draw(data.x, data.y, data.newX, data.newY);
    });
});