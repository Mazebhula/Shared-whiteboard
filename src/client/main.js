const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');
const socket = io();

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables to track drawing state
let drawing = false;
let current = { x: 0, y: 0 };

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