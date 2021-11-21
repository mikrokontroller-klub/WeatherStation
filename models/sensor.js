const mongoose = require('mongoose');

const sensorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'SensorType',
    },
    //TODO: Maybe there's a more efficient way to store the measurement - sensor connections
    measurements: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Measurement',
        },
    ],
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    },
    showLastMeasurement: {
        type: Boolean,
        required: true,
        default: true,
    },
    showGraph: {
        type: Boolean,
        required: true,
        default: true,
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
