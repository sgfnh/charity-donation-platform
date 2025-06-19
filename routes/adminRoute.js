const express = require('express')
const router = express.Router()
const userContro = require('../controller/adminController')

router.get('/users', userContro.getUser)
router.put('/user/:id/toggle', userContro.userStatus)
router.delete('/user/:id', userContro.deleteUser)
router.get('/campaigns', userContro.getCampaign)
router.put('/campaign/:id/toggle', userContro.campaignStatus)
router.delete('/campaign/:id', userContro.deleteCampaign)
router.post('/login', userContro.adminLogin)

module.exports = router;