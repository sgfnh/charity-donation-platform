const express = require('express')
const router = express.Router()
const userContro = require('../controller/userController')
router.post('/userR', userContro.userC)
router.post('/login', userContro.loginC)
router.get('/profile/:email', userContro.profileC)
router.put('/profile/:email', userContro.profileG)

module.exports = router;