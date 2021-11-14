const sensors = require('../models/sensor');

module.exports = {
    async up(db, client) {
        await db.collection('measurements').insertMany(
            Array(100)
                .fill(null)
                .map((a, index) => {
                    return {
                        value: 10 * Math.sin((1 / 52560) * index * 2 * Math.PI) + 2 * Math.sin((1 / 144) * index * 2 * Math.sin(index)) + 10 + (Math.random() - 0.5) * 10,
                        measuredAt: new Date(Date.now() - index * 1000),
                        createdAt: new Date(Date.now() - index * 1000),
                    };
                })
        );
    },

    async down(db, client) {
        await db.collection('measurements').deleteMany({});
    },
};
