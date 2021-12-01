module.exports = {
    async up(db, client) {
        // TODO write your migration here.
        // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
        // Example:
        // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
        await db.collection('sensortypes').insertMany([
            {
                name: 'Temperature',
                unit: '°C',
                unitName: 'Celsius',
                symbol: 'fas fa-thermometer-three-quarters',
            },
            {
                name: 'Humidity',
                unit: '%',
                unitName: 'Percentage',
                symbol: 'fas fa-tint',
            },
            {
                name: 'Air quality',
                unit: 'ppm',
                unitName: 'Parts per million',
                symbol: 'fas fa-biohazard',
            },
            {
                name: 'Pressure',
                unitName: 'Hecto Pascal',
                unit: 'hPa',
                symbol: 'fas fa-tachometer-alt',
            },
        ]);
    },

    async down(db, client) {
        // TODO write the statements to rollback your migration (if possible)
        // Example:
        // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
        await db.collection('sensor-types').deleteMany({});
    },
};
