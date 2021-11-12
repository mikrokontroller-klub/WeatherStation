const crypto = require('crypto');
//Generates a 64 bit API token
module.exports = () => {
    return crypto.randomBytes(16).toString('hex');
};
