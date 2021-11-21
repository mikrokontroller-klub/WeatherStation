module.exports = {
    async up(db, client) {
        const type = await db.collection('sensor-types').findOne({ name: 'Temperature' });
        const measurements = await db.collection('measurements').find({}).toArray();

        await db.collection('sensors').insertOne({
            name: 'My First Sensor',
            description: 'This is my first sensor',
            type: type._id,
            measurements: measurements.map((m) => m._id),
            latitude: -23.564,
            longitude: -46.632,
            showLastMeasurement: true,
            showGraph: true,
            color: 'info',
            createdAt: new Date(),
        });
    },

    async down(db, client) {
        await db.collection('sensors').deleteMany({});
    },
};
