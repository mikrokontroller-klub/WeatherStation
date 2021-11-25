const Measurement = require('../models/measurement');
const User = require('../models/user');
const Sensor = require('../models/sensor');
const chalk = require('chalk');

/**
 * @description API Controller for handling measurements
 */
exports.measurementController = {
    /** Display a listing of the resource. */
    index: async (req, res) => {},

    /** Show the form for creating a new resource. */
    create: async (req, res) => {},

    /** Store a newly created resource in storage. */
    store: async (req, res) => {
        if (req.body.token) {
            //Verify api token
            const apiToken = req.body.token;
            const user = await User.findOne({ apiToken });
            if (!user) {
                return res.status(400).json({
                    message: 'Invalid api token, please use the api token associated with a user account',
                });
            }
        } else {
            return res.status(400).json({
                message: 'Property: token is required',
            });
        }

        let sensor;
        if (req.body.sensorId) {
            //Verify sensor id
            const sensorId = req.body.sensorId;
            try {
                sensor = await Sensor.findById(sensorId);
            } catch (e) {
                sensor = null;
            }
            //TODO: Also check if this sensor belongs to the user
            if (!sensor) {
                return res.status(400).json({
                    message: 'Invalid sensor id, please use the sensor id associated with one of your sensors',
                });
            }
        } else {
            return res.status(400).json({
                message: 'Property: sensorId is required',
            });
        }

        if (req.body.value) {
            let measurement = new Measurement({
                value: req.body.value,
                //measuredAt: new Date(req.body.measuredAt) ?? undefined,
            });
            const saved = await measurement.save();
            sensor.measurements.push(saved);
            sensor.save();
        } else {
            console.log(chalk.yellow('[Create Measurement]:'), ' Missing value property');
            return res.status(400).json({
                message: 'Property: value is required',
            });
        }

        return res.status(200).json({
            message: 'Measurement saved successfully',
        });
    },

    /** Display the specified resource. */
    show: async (req, res) => {},

    /** Show the form for editing the specified resource. */
    edit: async (req, res) => {},

    /** Update the specified resource in storage. */
    update: async (req, res) => {},

    /** Remove the specified resource from storage. */
    destroy: async (req, res) => {},
};
