const express = require('express');
const router = express.Router();
const session = require('express-session');
const bodyParser = require('body-parser');
const { authenticationMiddleware } = require('../middlewares/authenticationMiddleware');
const { loginController } = require('../controllers/loginController');
const path = require('path');
const { log } = require('nodemon/lib/utils');

/**
 * @description This contains regular application routes
 */

router.use(
    session({
        secret: 'secret', //TODO: Read secret from .env file
        resave: true,
        saveUninitialized: true,
        //cookie: { secure: true },
    })
);
router.use(bodyParser.urlencoded({ extended: true }));

//Show login form
router.get('/login', loginController.index);

//Handle login procedure, set login cookies into session
router.post('/login', loginController.login);

//Logout the current session
router.post('/logout', loginController.logout);

router.use(authenticationMiddleware);

router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home.html'));
});

router.get('/sensors', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/sensors/index.html'));
});

router.get('/sensors/new', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/sensors/new.html'));
});

router.get('/sensors/:id/edit', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/sensors/edit.html'));
});

router.get('/sensors/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/sensors/view.html'));
});

router.get('/users', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/users/index.html'));
});

router.get('/users/new', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/users/new.html'));
});

router.get('/users/:id/edit', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/users/edit.html'));
});

router.get('/users/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/users/view.html'));
});

exports.routes = router;
