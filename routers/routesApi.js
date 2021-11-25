const express = require('express');
const { measurementController } = require('../controllers/measurementController');
const router = express.Router();

/**
 * @description This contains API routes
 */

router.put('/measurement/new', measurementController.store);

exports.apiRoutes = router;
