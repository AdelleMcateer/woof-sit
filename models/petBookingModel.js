const mongoose = require("mongoose");

const petBookingSchema = new mongoose.Schema(
  {
    pet: { type: mongoose.Schema.Types.ObjectID, ref: "pets" },
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

const petBookingModel = mongoose.model("petbookings", petBookingSchema);

module.exports = petBookingModel;
