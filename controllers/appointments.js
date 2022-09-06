const Appointment = require("../models/Appointment");


module.exports = {
  getAppointments: async (req, res) => {
    console.log(req.user);
    try {
      const todoItems = await Appointment.find({ userId: req.user.id });
      const itemsLeft = await Appointment.countDocuments({
        userId: req.user.id,
        completed: false,
      });
      res.render("appointments.ejs", {
        appointments: todoItems,
        left: itemsLeft,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createAppointment: async (req, res) => {
    console.log(req.body)
    function convertTimeFormatToTwelve(t) {
      let timeArray = t.split(':');
      let h = timeArray[0], m = timeArray[1];
      let twelveHourTime = (h > 12) ? (h-12 + ':' + m + ' PM') : (h + ':' + m + ' AM');
      return twelveHourTime;
    }
    try {
      await Appointment.create({
        appointment: req.body.appointment,
        appointmentDate: req.body.appointmentDate,
        appointmentTime: convertTimeFormatToTwelve(req.body.appointmentTime),
        notes: req.body.notes,
        completed: false,
        userId: req.user.id,
      });
      console.log("Todo has been added!");
      res.redirect("/appointments");
    } catch (err) {
      console.log(err);
    }
  },
  markComplete: async (req, res) => {
    try {
      await Appointment.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          completed: true,
        }
      );
      console.log("Marked Complete");
      res.json("Marked Complete");
    } catch (err) {
      console.log(err);
    }
  },
  markIncomplete: async (req, res) => {
    try {
      await Appointment.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          completed: false,
        }
      );
      console.log("Marked Incomplete");
      res.json("Marked Incomplete");
    } catch (err) {
      console.log(err);
    }
  },
  deleteAppointment: async (req, res) => {
    console.log(req.body.todoIdFromJSFile);
    try {
      await Appointment.findOneAndDelete({ _id: req.body.todoIdFromJSFile });
      console.log("Deleted Todo");
      res.json("Deleted It");
    } catch (err) {
      console.log(err);
    }
  },
};
