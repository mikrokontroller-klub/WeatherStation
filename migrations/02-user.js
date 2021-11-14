const generateApiToken = require('../utils/generateApiToken');

module.exports = {
    async up(db, client) {
        // TODO write your migration here.
        // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
        // Example:
        // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
        await db.collection('users').insertMany([
            {
                username: 'admin',
                password: 'admin',
                apiToken: generateApiToken(),
            },
            {
                username: 'user',
                password: 'user',
                apiToken: generateApiToken(),
            },
            {
                username: 'user2',
                password: 'user2',
                apiToken: generateApiToken(),
            },
        ]);
    },

    async down(db, client) {
        await db.collection('users').deleteOne({ username: 'admin' });
    },
};
