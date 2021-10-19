/**
 * @description Authentication middleware
 */

exports.authenticationMiddleware = async (req, res, next) => {
    if (req.session && req.session.loggedin) {
        return next();
    } else {
        return res.status(401).redirect('/login');
    }
};
