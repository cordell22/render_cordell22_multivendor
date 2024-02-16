const express = require('express');
const router = express.Router();
const registerController = require('../../controllers/vm_registerController');

// Display registration form
//	router.get('/', registerController.showRegistrationForm);
router.get('/', registerController.showRegistrationForm);

// Register user
router.post('/', registerController.registerUser);

module.exports = router;