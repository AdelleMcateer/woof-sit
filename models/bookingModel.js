const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    sitter: { type: mongoose.Schema.Types.ObjectID, ref: "sitters" },
    user: { type: mongoose.Schema.Types.ObjectID, ref: "users" },
    //Storing timeslots as objects in MongoDB
    bookedTimeSlots: {
      from: { type: String },
      to: { type: String },
    },
    totalHours: { type: Number },
    totalAmount: { type: Number },
    transactionId: { type: String },
    foodRequired: { type: Boolean },
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("bookings", bookingSchema);

module.exports = bookingModel;
