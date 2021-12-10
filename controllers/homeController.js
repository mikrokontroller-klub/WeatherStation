const moment = require('moment');
const Measurements = require('../models/measurement');
const Sensors = require('../models/sensor');

/**
 * @description
 */
exports.homeController = {
    /** Display a listing of the resource. */
    index: async (req, res) => {
        let lastMeasurements = await Sensors.find({ showLastMeasurement: true })
            .populate('sensortype')
            .populate('measurements', '', {
                sort: {
                    measuredAt: -1,
                },
            });

        //TODO: Do this mapping in DB
        lastMeasurements = lastMeasurements.map((sensor) => {
            return {
                id: sensor.id,
                name: sensor.name,
                type: sensor.sensortype.name,
                color: sensor.color,
                icon: {
                    name: sensor.sensortype.symbol,
                },
                measurement: {
                    measuredAt: moment(sensor.measurements[sensor.measurements.length - 1] ? sensor.measurements[sensor.measurements.length - 1].measuredAt : ''),
                    data: sensor.measurements[sensor.measurements.length - 1] ? sensor.measurements[sensor.measurements.length - 1].value.toFixed(2) : '-',
                    unitName: sensor.sensortype.unitName,
                    unitPostfix: sensor.sensortype.unit,
                },
            };
        });

        //TODO: Add time limits to the query
        const graphData = (
            await Sensors.find({ showGraph: true })
                .populate('measurements', '', {
                    sort: {
                        measuredAt: -1,
                    },
                })
                .populate('sensortype')
        ).map((sensor) => {
            return {
                id: sensor._id,
                name: sensor.name,
                type: sensor.sensortype.name,
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
                    start: moment(sensor.measurements[0] ? sensor.measurements[0].measuredAt : ''),
                    end: moment(sensor.measurements[0] ? sensor.measurements[sensor.measurements.length - 1].measuredAt : ''),
                },
            };
        });

        res.render('pages/home/index', { activePage: 'home', lastMeasurements, graphData, moment });
    },
};
