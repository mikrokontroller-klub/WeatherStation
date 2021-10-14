/**
 * @description Authentication middleware
 */

exports.authenticationMiddleware = async (req, res, next) => {
    console.log('Auth middleware');
    if (req.session && req.session.loggedin) {
        return next();
    } else {
        return res.status(401).redirect('/login');
    }
};
