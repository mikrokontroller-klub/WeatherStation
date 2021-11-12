const Sensor = require('../models/sensor');
const Measurement = require('../models/measurement');

/**
 * @description Resourceful controller for the sensors
 */
exports.sensorController = {
    /** Display a listing of the resource. */
    index: async (req, res) => {
        let sensors = await Sensor.find({}).select({
            _id: 1,
            name: 1,
            type: 1,
            description: 1,
        });
        res.render('pages/sensors/index', { activePage: 'sensors', sensors });
    },

    /** Show the form for creating a new resource. */
    create: async (req, res) => {
        res.render('pages/sensors/new', { activePage: 'sensors' });
    },

    /** Store a newly created resource in storage. */
    store: async (req, res) => {
        //TODO: Save sensor into DB
    },

    /** Display the specified resource. */
    show: async (req, res) => {
        let sensor = await Sensor.findOne({
            _id: req.params.id,
        });
        //TODO: Connect queries in mongo, and create time window for data
        let measurements = await Measurement.find({ sensorId: sensor.id });
        sensor.measurements = {
            data: measurements.map((measurement) => measurement.value),
            //Labels in HH:mm format
            labels: measurements.map((measurement) => measurement.createdAt.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })),
        };
        res.render('pages/sensors/view', { activePage: 'sensors', sensor });
    },

    /** Show the form for editing the specified resource. */
    edit: async (req, res) => {
        let sensor = await Sensor.findOne({
            _id: req.params.id,
        });
        res.render('pages/sensors/edit', { activePage: 'sensors', sensor });
    },

    /** Update the specified resource in storage. */
    update: async (req, res) => {
        //TODO: Update sensor in DB
    },

    /** Remove the specified resource from storage. */
    destroy: async (req, res) => {
        await Sensor.findOneAndDelete({
            _id: req.params.id,
        });
        res.redirect('/sensors');
    },
};
