const path = require('path');
/**
 * @description
 */
exports.homeController = {
    //Show home page
    index: async (req, res) => {
        res.sendFile(path.join(__dirname, '../views/home.html'));
    },
};
