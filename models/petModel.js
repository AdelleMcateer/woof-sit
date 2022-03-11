const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    age: { type: Number, required: true },
    dogType: { type: String, required: false },
    bookedTimeSlots: [
      {
        from: { type: String, required: true },
        to: { type: String, required: true },
      },
    ],

    rateOfferedPerHour: { type: Number, required: true },
    county: { type: String, required: true },
  },
  { timestamps: true }
);

const petModel = mongoose.model("pets", petSchema);
module.exports = petModel;
