/**
 * @description
 */
exports.baseController = {
    /** Display a listing of the resource. */
    index: async (req, res) => {
        if (req.session && req.session.loggedin) {
            res.redirect('/home');
        } else {
            res.redirect('/login');
        }
    },
};
