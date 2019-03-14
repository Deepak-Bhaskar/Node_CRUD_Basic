const express = require('express')
const router = express.Router()

// Require the controller
const user_controller = require('../controllers/user')

// A simple test check
router.get('/test', user_controller.test)

// Create user route
router.post('/create', user_controller.user_create)

// Get user detail by Id
router.get('/user/:id', user_controller.user_detail_Id)

// Get user list
router.get('/userlist', user_controller.user_list)

// Update user by Id
router.put('/:id/update', user_controller.user_update)

// Delete user
router.delete('/:id/delete', user_controller.user_delete)

//User login
router.post('/login', user_controller.user_login)


module.exports = router