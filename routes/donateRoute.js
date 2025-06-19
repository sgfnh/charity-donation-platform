const express = require('express')
const router = express.Router()

const userContro = require('../controller/donateController')
const userauthentication = require('../middleware/middleware')

router.post('/donateR', userauthentication.authenticate, userContro.donateDes)
router.get('/donateGet', userauthentication.authenticate, userContro.getDonation)
router.get('/donateCharity', userauthentication.authenticate, userContro.donateCharity)
router.post('/updateTransaction/:email', userauthentication.authenticate, userContro.updateTransaction)
router.get('/download', userauthentication.authenticate, userContro.downloadC)
router.get('/history/:email', userContro.donationHistory)

module.exports = router;