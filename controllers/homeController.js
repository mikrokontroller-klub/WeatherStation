const moment = require('moment');
const Measurements = require('../models/measurement');

/**
 * @description
 */
exports.homeController = {
    /** Display a listing of the resource. */
    index: async (req, res) => {
        /*let lastMeasurements = [
            {
                id: 1,
                name: 'My Temperature Sensor',
                type: 'Temperature',
                icon: {
                    name: 'fas fa-thermometer-half',
                    color: 'warning',
                },
                measurement: {
                    measuredAt: moment(),
                    data: 15.67,
                    unitName: 'Celsius',
                    unitPostfix: 'C°',
                },
            },
        ];*/
        //Get latest measurements by sensor from db
        const measurements = await Measurements.aggregate([
            {
                //Group by sensors, and for every sensor get the latest measurement
                $group: {
                    _id: '$sensorId',
                    measurement: {
                        $last: '$$ROOT',
                    },
                },
            },
        ]);
        lastMeasurements = measurements.map((measurement) => {
            return {
                id: measurement._id,
                icon: {
                    name: 'fas fa-thermometer-half',
                    color: 'info',
                },
                measurement: {
                    measuredAt: moment(measurement.measurement.measuredAt),
                    data: measurement.measurement.value.toFixed(2),
                    unitName: measurement.measurement.unitName,
                    unitPostfix: measurement.measurement.unit,
                },
            };
        });

        /*let sensorMeasurements = [
            {
                id: 2,
                name: 'My Humidity Sensor',
                type: 'Humidty',
                color: 'info',
                measurements: {
                    data: Array.from({ length: 20 }, () => Math.floor(Math.random() * 40)).sort((a, b) => a - b),
                    labels: Array.from({ length: 20 }, () => Math.floor(Math.random() * 40)).sort((a, b) => a - b),
                },
            },
            {
                id: 3,
                name: 'My Pressure Sensor',
                type: 'Pressure',
                color: 'danger',
                measurements: {
                    data: Array.from({ length: 20 }, () => Math.floor(Math.random() * 40)).sort((a, b) => a - b),
                    labels: Array.from({ length: 20 }, () => Math.floor(Math.random() * 40)).sort((a, b) => a - b),
                },
            },
        ];*/
        //Get measurements by sensor from db
        const measurementsBySensor = await Measurements.aggregate([
            {
                //Group by sensors, and for every sensor get the latest measurement
                $group: {
                    _id: '$sensorId',
                    measurements: {
                        $push: '$$ROOT',
                    },
                },
            },
        ]);
        let sensorMeasurements = measurementsBySensor.map((measurement) => {
            return {
                id: measurement._id,
                name: measurement.measurements[0].sensorName,
                type: 'Temperature',
                color: 'info',
                measurements: {
                    data: measurement.measurements.map((measurement) => {
                        return measurement.value;
                    }),
                    labels: measurement.measurements.map((measurement) => {
                        return moment(measurement.measuredAt).format('HH:mm');
                    }),
                },
            };
        });

        res.render('pages/home/index', { activePage: 'home', lastMeasurements, sensorMeasurements, moment });
    },
};
