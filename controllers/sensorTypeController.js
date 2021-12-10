const SensorType = require('../models/sensor-type');
const chalk = require('chalk');
const { ErrorHandler } = require('../utils/error');

/**
 * @description Controller for managing Sensor Types, like temperature, humidity, etc.
 */
exports.sensorTypeController = {
    /** Display a listing of the resource. */
    index: async (req, res) => {
        let types = await SensorType.find({});
        res.render('pages/sensor-types/index', { activePage: 'sensor-types', types });
    },

    /** Show the form for creating a new resource. */
    create: async (req, res) => {
        res.render('pages/sensor-types/new', { activePage: 'sensor-types' });
    },

    /** Store a newly created resource in storage. */
    store: async (req, res) => {
        try {
            let type = new SensorType({
                name: req.body.name,
                unit: req.body.unit,
                unitName: req.body.unitName,
                symbol: req.body.symbol,
            });
            await type.save();
            res.redirect('/sensor-types');
        } catch (e) {
            console.log(chalk.red('[Create New Sensor]: '), e);
            res.redirect('/sensor-types');
        }
    },

    /** Display the specified resource. */
    show: async (req, res) => {
        let type = await SensorType.findById(req.params.id);
        res.render('pages/sensor-types/show', { activePage: 'sensor-types', type });
    },

    /** Show the form for editing the specified resource. */
    edit: async (req, res, next) => {
        try {
            let type = await SensorType.findById(req.params.id);
            res.render('pages/sensor-types/edit', { activePage: 'sensor-types', type });
        } catch (e) {
            next(new ErrorHandler(404, `Sensor Type not found with id: ${req.params.id}`));
        }
    },

    /** Update the specified resource in storage. */
    update: async (req, res) => {
        try {
            let type = await SensorType.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                unit: req.body.unit,
                unitName: req.body.unitName,
                symbol: req.body.symbol,
            });
            await type.save();
            res.redirect('/sensor-types');
        } catch (e) {
            console.log(chalk.red('[Update Sensor]: '), e);
            res.redirect(`/sensor-types/${req.params.id}/edit`);
        }
    },

    /** Remove the specified resource from storage. */
    destroy: async (req, res) => {
        await SensorType.findByIdAndDelete(req.params.id);
        res.redirect('/sensor-types');
    },
};
