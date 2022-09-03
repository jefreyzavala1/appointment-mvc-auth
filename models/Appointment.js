const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const AppointmentSchema = new mongoose.Schema({
  appointment: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  },

  appointmentDate:{
   type: Date,
   required: true
  },

  appointmentTime:{
  type: String,
  required: true
  },

  notes: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Appointment', AppointmentSchema)
