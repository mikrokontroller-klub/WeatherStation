module.exports = {
    async up(db, client) {
        const type = await db.collection('types').findOne({ name: 'Temperature' });

        await db.collection('sensors').insertOne({
            name: 'My First Sensor',
            description: 'This is my first sensor',
            typeId: type._id,
            coordinates: {
                latitude: -23.564,
                longitude: -46.632,
            },
            showLastMeasurement: true,
            showGraph: true,
            color: 'info',
            measuredAt: new Date(),
        });
    },

    async down(db, client) {
        await db.collection('sensors').deleteMany({});
    },
};
