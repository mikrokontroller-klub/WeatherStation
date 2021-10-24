const path = require('path');
/**
 * @description
 */
exports.homeController = {
    /** Display a listing of the resource. */
    index: async (req, res) => {
        //res.sendFile(path.join(__dirname, '../views/home.html'));
        res.render('pages/home/index');
    },
};
