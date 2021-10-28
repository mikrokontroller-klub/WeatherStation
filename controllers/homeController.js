const moment = require('moment');

/**
 * @description
 */
exports.homeController = {
    /** Display a listing of the resource. */
    index: async (req, res) => {
        let lastMeasurements = [
            {
                id: 1,
                name: 'My Temperature Sensor',
                type: 'Temperature',
                icon: {
                    name: 'fas fa-thermometer-half',
                    color: 'warning',
                },
                measurement: {
                    measuredAt: moment().subtract(10, 'minutes'),
                    data: 15.67,
                    unitName: 'Celsius',
                    unitPostfix: 'C°',
                },
            },
            {
                id: 2,
                name: 'My Humidity Sensor',
                type: 'Humidity',
                icon: {
                    name: 'fas fa-tint',
                    color: 'info',
                },
                measurement: {
                    measuredAt: moment().subtract(15, 'minutes'),
                    data: 83.2,
                    unitName: 'Humidity',
                    unitPostfix: '%',
                },
            },
        ];
        let sensorMeasurements = [
            {
                id: 2,
                name: 'My Humidity Sensor',
                type: 'Humidty',
                color: 'info',
                measurements: {
                    data: Array.from({ length: 20 }, () => Math.floor(Math.random() * 40)),
                    labels: Array.from({ length: 20 }, () => Math.floor(Math.random() * 40)),
                },
            },
            {
                id: 3,
                name: 'My Pressure Sensor',
                type: 'Pressure',
                color: 'danger',
                measurements: {
                    data: Array.from({ length: 20 }, () => Math.floor(Math.random() * 40)),
                    labels: Array.from({ length: 20 }, () => Math.floor(Math.random() * 40)),
                },
            },
        ];
        res.render('pages/home/index', { activePage: 'home', lastMeasurements, sensorMeasurements, moment });
    },
};
