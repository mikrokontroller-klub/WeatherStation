const assert = require('assert');
const { loginController } = require('../controllers/loginController');
const connectDB = require('../utils/connectDB');

describe('Login Controller', () => {
    describe('Login', () => {
        before(async () => {
            await connectDB('weatherStation');
        });

        it('Should require a username and a password', function (done) {
            loginController.login({ session: {}, body: {} }, {}, function (err, res) {
                assert.equal(err.message, 'Username and password are required');
                done();
            });
        });
        it('Should return an error if the username is not found', (done) => {
            loginController.login({ session: {}, body: { username: 'no-user', password: 'pass' } }, {}, (err, res) => {
                assert.equal(err.message, 'Invalid username or password');
                done();
            });
        });
        it('Should return an error if the password is incorrect', (done) => {
            loginController.login({ session: {}, body: { username: 'admin', password: 'test' } }, {}, (err, res) => {
                assert.equal(err.message, 'Invalid username or password');
                done();
            });
        });
        it('Should authenticate the user when the correct credentials are used', (done) => {
            loginController.login({ session: {}, body: { username: 'admin', password: 'admin' } }, { redirect: () => {} }, (err, res) => {
                assert.equal(err.session.loggedin, true);
                assert.equal(err.session.username, 'admin');
                done();
            });
        });
    });
    describe('Logout', () => {
        let res = { redirect: () => {}, end: () => {} };
        it('Should do nothing if the user is not logged in', (done) => {
            loginController.logout({ session: { destroy: () => {} } }, res, (err, res) => {
                assert.equal(!!err.session.loggedin, false);
                done();
            });
        });
        it('Should logout the user', (done) => {
            loginController.logout(
                {
                    session: {
                        loggedin: true,
                        username: 'admin',
                        destroy: () => {},
                    },
                },
                res,
                (err, res) => {
                    assert.equal(err.session, undefined);
                    done();
                }
            );
        });
    });
});
