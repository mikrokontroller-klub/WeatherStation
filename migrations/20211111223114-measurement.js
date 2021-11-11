module.exports = {
    async up(db, client) {
        await db.collection('measurements').insertMany([
            ...Array(100).map((value, index) => ({
                sensorId: '',
                value: 10 * Math.sin((1 / 52560) * index * 2 * Math.PI) + 2 * Math.sin((1 / 144) * index * 2 * Math.sin) + 10 + (Math.random() - 0.5) * 10,
                unit: 'C',
                unitName: 'Celsius',
            })),
        ]);
    },

    async down(db, client) {
        await db.collection('measurements').deleteMany({});
    },
};
