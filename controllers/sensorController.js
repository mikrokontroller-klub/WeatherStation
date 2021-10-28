/**
 * @description Resourceful controller for the sensors
 */
exports.sensorController = {
    /** Display a listing of the resource. */
    index: async (req, res) => {
        let sensors = [
            {
                id: 1,
                name: 'My Temperature Sensor',
                type: 'Temperature',
                description: 'Inside Sensor',
            },
            {
                id: 2,
                name: 'My Humidity Sensor',
                type: 'Humidity',
                description: '',
            },
            {
                id: 3,
                name: 'My Pressure Sensor',
                type: 'Pressure',
                description: 'On the roof ',
            },
        ];
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
        let sensor = {
            id: 1,
            name: 'My Temperature Sensor',
            type: 'Temperature',
            description: 'Inside Sensor',
            showLastMeasurement: true,
            showGraph: true,
            color: 'info',
            coordinate: {
                latitude: 47.473118115829706,
                longitude: 19.0533464181153,
            },
            measurements: {
                data: Array.from({ length: 20 }, () => Math.floor(Math.random() * 40)).sort((a, b) => a - b),
                labels: Array.from({ length: 20 }, () => Math.floor(Math.random() * 40)).sort((a, b) => a - b),
            },
        };
        res.render('pages/sensors/view', { activePage: 'sensors', sensor });
    },

    /** Show the form for editing the specified resource. */
    edit: async (req, res) => {
        let sensor = {
            id: 1,
            name: 'My Temperature Sensor',
            type: 'Temperature',
            description: 'Inside Sensor',
            showLastMeasurement: true,
            showGraph: true,
            coordinate: {
                latitude: 47.473118115829706,
                longitude: 19.0533464181153,
            },
        };
        res.render('pages/sensors/edit', { activePage: 'sensors', sensor });
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
