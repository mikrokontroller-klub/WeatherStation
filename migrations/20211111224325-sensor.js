module.exports = {
    async up(db, client) {
        await db.collection('sensor').insertOne({
            name: 'My First Sensor',
            description: 'This is my first sensor',
            type: 'temperature',
            latitude: '-23.564',
            longitude: '-46.632',
            showLastMeasurement: true,
            showGraph: true,
            color: 'info',
        });
    },

    async down(db, client) {
        await db.collection('sensor').deleteMany({});
    },
};
