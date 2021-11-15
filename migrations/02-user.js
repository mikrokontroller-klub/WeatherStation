const generateApiToken = require('../utils/generateApiToken');
const bcrypt = require('bcrypt');

module.exports = {
    async up(db, client) {
        // TODO write your migration here.
        // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
        // Example:
        // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
        await db.collection('users').insertMany([
            {
                username: 'admin',
                password: await bcrypt.hash('admin', 10),
                apiToken: generateApiToken(),
            },
            {
                username: 'user',
                password: await bcrypt.hash('user', 10),
                apiToken: generateApiToken(),
            },
            {
                username: 'user2',
                password: await bcrypt.hash('user2', 10),
                apiToken: generateApiToken(),
            },
        ]);
    },

    async down(db, client) {
        await db.collection('users').deleteMany({});
    },
};
