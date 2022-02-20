const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Sitter = require("../models/sitterModel");
const stripe = require("stripe")("my_PRIVATE_stripekey");
const { v4: uuidv4 } = require("uuid");

router.post("/booksitter", async (req, res) => {
  const { token } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: req.body.totalAmount * 100,
        currency: "eur",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      req.body.transactionId = payment.source.id;
      const newbooking = new Booking(req.body);
      await newbooking.save();
      const sitter = await Sitter.findOne({ _id: req.body.sitter });
      console.log(req.body.sitter);
      sitter.bookedTimeSlots.push(req.body.bookedTimeSlots);

      await sitter.save();
      res.send("Your booking is successfull");
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
