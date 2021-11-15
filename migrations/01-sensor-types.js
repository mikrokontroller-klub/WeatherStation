module.exports = {
    async up(db, client) {
        // TODO write your migration here.
        // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
        // Example:
        // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
        await db.collection('sensortypes').insertMany([
            {
                name: 'Temperature',
                unit: 'C°',
                unitName: 'Celsius',
            },
            {
                name: 'Humidity',
                unit: '%',
                unitName: 'Percentage',
            },
            {
                name: 'Air quality',
                unit: 'ppm',
                unitName: 'Parts per million',
            },
            {
                name: 'Pressure',
                unitName: 'Hecto Pascal',
                unit: 'hPa',
            },
        ]);
    },

    async down(db, client) {
        // TODO write the statements to rollback your migration (if possible)
        // Example:
        // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
        await db.collection('sensortypes').deleteMany({});
    },
};
