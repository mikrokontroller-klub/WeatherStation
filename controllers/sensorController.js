const path = require('path');
/**
 * @description Resourceful controller for the sensors
 */
exports.sensorController = {
    //Display a listing of the resource.
    index: async (req, res) => {
        res.sendFile(path.join(__dirname, '../views/sensors/index.html'));
    },
    //Show the form for creating a new resource.
    create: async (req, res) => {
        res.sendFile(path.join(__dirname, '../views/sensors/new.html'));
    },
    //Store a newly created resource in storage.
    store: async (req, res) => {},
    // Display the specified resource.
    show: async (req, res) => {},
    //Edit an existing sensor => Form
    edit: async (req, res) => {
        res.sendFile(path.join(__dirname, '../views/sensors/edit.html'));
    },
    //View one sensor by id
    view: async (req, res) => {
        res.sendFile(path.join(__dirname, '../views/sensors/view.html'));
    },
    //
    update: async (req, res) => {},
    // Remove the specified resource from storage.
    destroy: async (req, res) => {},
};
