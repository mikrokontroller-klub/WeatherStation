const mongoose = require('mongoose');

const measurementSchema = mongoose.Schema({
    value: {
        type: Number,
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
