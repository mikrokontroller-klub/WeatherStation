const mongoose = require('mongoose');

const sensorTypeSchema = mongoose.Schema({
    //Name of the sensor type like Temperature, Humidity, etc.
    name: {
        type: String,
        required: true,
    },
    //Unit of the sensor type like C, F, % etc.
    unit: {
        type: String,
        required: true,
    },
    //FullName of unit of measurement like Celsius, Fahrenheit, etc.
    unitName: {
        type: String,
        required: true,
    },
    symbol: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('SensorType', sensorTypeSchema);
