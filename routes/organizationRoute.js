const express = require('express')
const router = express.Router()
const userContro = require('../controller/organizationController')

router.post('/organizationRegister', userContro.organizationRegister)
router.post('/organizationlogin', userContro.organizationLogin)
router.get('/', userContro.exploreCampaign)
router.get('/:email', userContro.getCampaign)
router.post('/create', userContro.createCampaign)
router.put('/update/:id', userContro.updateCampaign)
router.delete('/delete/:id', userContro.deleteCampaign)
module.exports = router;