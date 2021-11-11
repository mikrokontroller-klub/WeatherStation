module.exports = {
    async up(db, client) {
        // TODO write your migration here.
        // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
        // Example:
        // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
        await db.collection('users').insertOne({
            username: 'admin',
            password: 'admin',
            apiToken: '',
        });
    },

    async down(db, client) {
        await db.collection('users').deleteOne({ username: 'admin' });
    },
};
