const mongoose = require('mongoose');
const chalk = require('chalk');

module.exports = async (database, url = '127.0.0.1', port = '27017') => {
    try {
        if (mongoose.connection.readyState === 0 || mongoose.connection.readyState === 3) {
            await mongoose.connect(`mongodb://${url}:${port}/${database}`, {
                directConnection: true,
                serverSelectionTimeoutMS: 3000,
            });
            console.log(chalk.cyan('[MongoDB]:'), ' Successfully connected');
        }
    } catch (err) {
        console.log(chalk.red('[MonogDB]: Could not connect'), err);
    }
};
