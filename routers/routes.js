const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { authenticationMiddleware } = require('../middlewares/authenticationMiddleware');
const { loginController } = require('../controllers/loginController');
const { homeController } = require('../controllers/homeController');
const { userController } = require('../controllers/userController');
const { sensorController } = require('../controllers/sensorController');
const { sensorTypeController } = require('../controllers/sensorTypeController');

/**
 * @description This contains regular application routes
 */

router.use(bodyParser.urlencoded({ extended: true }));

/**
 * Authenticate routes
 */

//Show login form
router.get('/login', loginController.index);

//Handle login procedure, set login cookies into session
router.post('/login', loginController.login);

//Logout the current session
router.post('/logout', loginController.logout);

router.use(authenticationMiddleware);

//Show home dashboard
router.get('/home', homeController.index);

/**
 * Sensors CRUD
 */

//Show sensors page - all sensor
router.get('/sensors', sensorController.index);

//CREATE - Sensors
router.get('/sensors/new', sensorController.create); //Show the form
router.put('/sensors/new', sensorController.store); //Process data from form

//UPDATE - Sensors
router.get('/sensors/:id/edit', sensorController.edit); //Show the form
router.put('/sensors/:id/edit', sensorController.update); //Process data from from

//READ - Sensors
router.get('/sensors/:id', sensorController.show);

//DELETE - Sensors
router.delete('/sensors/:id', sensorController.destroy);

/**
 * Sensor Types
 */

//Show sensor types page - all sensor types
router.get('/sensor-types', sensorTypeController.index);

//CREATE - Sensor Types
router.get('/sensor-types/new', sensorTypeController.create); //Show the form
router.put('/sensor-types/new', sensorTypeController.store); //Process data from form

//UPDATE - Sensor Types
router.get('/sensor-types/:id/edit', sensorTypeController.edit); //Show the form
router.put('/sensor-types/:id/edit', sensorTypeController.update); //Process data from from

//DELETE - Sensor Types
router.delete('/sensor-types/:id', sensorTypeController.destroy);

/**
 * Users CRUD
 */

//Show users page - all users
router.get('/users', userController.index);

//Show user create form
router.get('/users/new', userController.create);
router.put('/users/new', userController.store);

//Show user edit form
router.get('/users/:id/edit', userController.edit);
router.put('/users/:id/edit', userController.update);

//Show user data by id
router.get('/users/:id', userController.show);

//Delete user by id
router.delete('/users/:id', userController.destroy);

//Generate api token for user by id
router.get('/users/:id/token', userController.generateToken);

exports.routes = router;
