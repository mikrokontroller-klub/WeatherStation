const moment = require('moment');
const Measurements = require('../models/measurement');
const Sensors = require('../models/sensor');

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
        /*const measurements = await Measurements.aggregate([
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
        });*/

        const lastMeasurements = (
            await Sensors.find({ showLastMeasurement: true })
                .populate('type')
                .populate('measurements', '', {
                    sort: {
                        measuredAt: -1,
                    },
                })
        ).map((sensor) => {
            return {
                id: sensor.id,
                name: sensor.name,
                type: sensor.type.name,
                icon: {
                    name: 'fas fa-thermometer-half',
                    color: sensor.color,
                },
                measurement: {
                    measuredAt: moment(sensor.measurements[0].measuredAt),
                    data: sensor.measurements[0].value.toFixed(2),
                    unitName: sensor.type.unitName,
                    unitPostfix: sensor.type.unit,
                },
            };
        });

        const graphData = (
            await Sensors.find({ showGraph: true })
                .populate('measurements', '', {
                    sort: {
                        measuredAt: -1,
                    },
                })
                .populate('type')
        ).map((sensor) => {
            return {
                id: sensor._id,
                name: sensor.name,
                type: sensor.type.name,
                color: sensor.color,
                measurements: {
                    data: sensor.measurements.map((measurement) => {
                        return measurement.value;
                    }),
                    labels: sensor.measurements.map((measurement) => {
                        return moment(measurement.measuredAt).format('HH:mm');
                    }),
                },
                interval: {
                    start: moment(sensor.measurements[0].measuredAt),
                    end: moment(sensor.measurements[sensor.measurements.length - 1].measuredAt),
                },
            };
        });
        console.log(graphData);

        res.render('pages/home/index', { activePage: 'home', lastMeasurements, graphData, moment });
    },
};
