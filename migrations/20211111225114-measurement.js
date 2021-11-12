const sensors = require('../models/sensor');

module.exports = {
    async up(db, client) {
        const sensor = await db.collection('sensors').findOne({ name: 'My First Sensor' });

        console.log(sensor);

        await db.collection('measurements').insertMany(
            Array(100)
                .fill(null)
                .map((a, index) => {
                    return {
                        sensorId: sensor._id,
                        value: 10 * Math.sin((1 / 52560) * index * 2 * Math.PI) + 2 * Math.sin((1 / 144) * index * 2 * Math.sin(index)) + 10 + (Math.random() - 0.5) * 10,
                        unit: 'C',
                        unitName: 'Celsius',
                    };
                })
        );
    },

    async down(db, client) {
        await db.collection('measurements').deleteMany({});
    },
};
