const Sensor = require('../models/sensor');
const Measurement = require('../models/measurement');
const SensorType = require('../models/sensor-type');
const cutLongText = require('../utils/cutLongText');
const { ErrorHandler } = require('../utils/error');
const chalk = require('chalk');

/**
 * @description Resourceful controller for the sensors
 */
exports.sensorController = {
    /** Display a listing of the resource. */
    index: async (req, res) => {
        let sensors = await Sensor.find({})
            .select({
                _id: 1,
                name: 1,
                type: 1,
                description: 1,
            })
            .populate('sensortype');
        sensors = sensors.map((sensor) => {
            sensor.description = cutLongText(sensor.description, 35);
            return sensor;
        });
        res.render('pages/sensors/index', { activePage: 'sensors', sensors });
    },

    /** Show the form for creating a new resource. */
    create: async (req, res) => {
        let sensorTypes = await SensorType.find({}).select({
            _id: 1,
            name: 1,
        });
        res.render('pages/sensors/new', { activePage: 'sensors', sensorTypes });
    },

    /** Store a newly created resource in storage. */
    store: async (req, res, next) => {
        //TODO: Refactor validation, move to middleware
        //Validate the request
        req.checkBody('name', 'Name is required').notEmpty();
        req.checkBody('type', 'Sensor Type is required').notEmpty();
        //Color must be a bootstrap color
        req.checkBody('color', 'Color must be a valid Bootstrap color').isIn([undefined, 'primary', 'secondary', 'success', 'danger', 'warning', 'info']);

        //Check for errors
        let errors = req.validationErrors();
        if (errors) {
            console.log(errors);
            //req.flash('error', errors);
            return res.redirect('/sensors/new');
        }

        //Get typeId from DB
        try {
            try {
                let sensorType = await SensorType.findById(req.body.type);
                //Validate sensorType
                if (!sensorType) {
                    //req.flash('error', 'Sensor type not found');
                    return res.redirect('/sensors/new');
                }
            } catch (e) {
                throw new ErrorHandler(500, 'Sensor Type not found');
            }

            try {
                let sensor = new Sensor({
                    name: req.body.name,
                    sensortype: sensorType.id,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    color: req.body.color ?? 'primary',
                    description: req.body.description,
                });
                await sensor.save();
                res.redirect('/sensors');
            } catch (e) {
                throw new ErrorHandler(500, "Can't create sensor");
            }
        } catch (e) {
            next(e);
        }
    },

    /** Display the specified resource. */
    show: async (req, res, next) => {
        try {
            let sensor;
            try {
                sensor = await Sensor.findOne({
                    _id: req.params.id,
                });
            } catch (e) {
                throw new ErrorHandler(500, 'Sensor not found with id: ' + req.params.id);
            }
            //TODO: Connect queries in mongo, and create time window for data
            let measurements = await Measurement.find({ sensorId: sensor.id });
            sensor.measurements = {
                data: measurements.map((measurement) => measurement.value),
                //Labels in HH:mm format
                labels: measurements.map((measurement) => measurement.createdAt.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })),
            };
            res.render('pages/sensors/view', { activePage: 'sensors', sensor });
        } catch (e) {
            next(e);
        }
    },

    /** Show the form for editing the specified resource. */
    edit: async (req, res) => {
        try {
            let sensor = await Sensor.findOne({
                _id: req.params.id,
            }).populate('sensortype');
            let sensorTypes = await SensorType.find({}).select({
                _id: 1,
                name: 1,
            });
            res.render('pages/sensors/edit', { activePage: 'sensors', sensor, sensorTypes });
        } catch (e) {
            console.error(e);
            res.redirect('/sensors');
        }
    },

    /** Update the specified resource in storage. */
    update: async (req, res, next) => {
        // Update sensor in DB
        try {
            await Sensor.findOneAndUpdate(
                {
                    _id: req.params.id,
                },
                {
                    name: req.body.name,
                    sensortype: req.body.type,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    showLastMeasurement: !!req.body.showLastMeasurement,
                    showGraph: !!req.body.showGraph,
                    color: req.body.color ?? 'primary',
                    description: req.body.description,
                }
            );
            res.redirect('/sensors');
        } catch (e) {
            next(new ErrorHandler(500, `Can't update sensor with id: ${req.params.id}`));
        }
    },

    /** Remove the specified resource from storage. */
    destroy: async (req, res) => {
        try {
            //Check if sensor has measurements
            let sensor = await Sensor.findOne({
                _id: req.params.id,
            });
            if (sensor.measurements.length > 0) {
                //req.flash('error', 'Sensor has measurements, cannot delete');
                return res.redirect('/sensors');
            }
            await Sensor.findByIdAndDelete(req.params.id);
        } catch (e) {
            console.error(e);
        }
        res.redirect('/sensors');
    },
};
