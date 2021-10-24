const path = require('path');
/**
 * @description Resourceful controller for the sensors
 */
exports.sensorController = {
    /** Display a listing of the resource. */
    index: async (req, res) => {
        res.render('pages/sensors/index');
    },
    /** Show the form for creating a new resource. */
    create: async (req, res) => {
        res.render('pages/sensors/new');
    },
    /** Store a newly created resource in storage. */
    store: async (req, res) => {
        //TODO: Save sensor into DB
    },
    /** Display the specified resource. */
    show: async (req, res) => {
        res.render('pages/sensors/view');
    },
    /** Show the form for editing the specified resource. */
    edit: async (req, res) => {
        res.render('pages/sensors/edit');
    },
    /** Update the specified resource in storage. */
    update: async (req, res) => {
        //TODO: Update sensor in DB
    },
    /** Remove the specified resource from storage. */
    destroy: async (req, res) => {
        //TODO: Remove sensor from DB
    },
};
