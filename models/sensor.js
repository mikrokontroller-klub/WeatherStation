const mongoose = require('mongoose');

const sensorSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    showLastMeasurement: {
        type: Boolean,
        required: true,
    },
    showGraph: {
        type: Boolean,
        required: true,
    },
    //Color of the graph in the UI, uses bootstrap colors
    color: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Sensor', sensorSchema);
