const express = require('express');
const router = express.Router();
const userController = require('../user.js');

router.route('/').get(userController.fetchUsers).post(userController.createNewUser).put(userController.updateUser).delete(userController.deleteUser);

// router.route('/:id').get

module.exports = router;