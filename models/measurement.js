const mongoose = require('mongoose');

const measurementSchema = mongoose.Schema({
    sensorId: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    //Unit of measurement
    unit: {
        type: String,
        required: true,
    },
    unitName: {
        type: String,
        required: true,
    },
    //When the measurement was taken
    measuredAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    //When the data is stored in the database
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Measurement', measurementSchema);
