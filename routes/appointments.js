const express = require('express')
const router = express.Router()
const appointmentsController = require('../controllers/appointments') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, appointmentsController.getAppointments)

router.post('/createAppointment', appointmentsController.createAppointment)

router.put('/markComplete', appointmentsController.markComplete)

router.put('/markIncomplete', appointmentsController.markIncomplete)

router.delete('/deleteAppointment', appointmentsController.deleteAppointment)

module.exports = router