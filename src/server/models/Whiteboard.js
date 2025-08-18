const mongoose = require('mongoose');

const whiteboardSchema = new mongoose.Schema({
    drawings: {
        type: Array,
        required: true,
        default: []
    },
    text: {
        type: Array,
        required: true,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Whiteboard = mongoose.model('Whiteboard', whiteboardSchema);

module.exports = Whiteboard;