const Stripe = require("stripe");
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_KEY);
const bookingModel = require("../models/bookingSchema");

const createCheckOut = async (req, res) => {
  try {
    const { totalAmount, totalAdvance, turfId, data, date, selectedSlots } =
      req.body;
    const details = req.body;

    const existingBooking = await bookingModel.find({
      turf: turfId,
      bookedDate: date,
    });
    console.log(existingBooking);
    console.log(existingBooking.bookedSlots);

    if (existingBooking) {
      const bookedSlotsArray = existingBooking.map(
        (document) => document.bookedSlots
      );
      const conflictSlots = bookedSlotsArray.flat();
      const overlappingSlots = selectedSlots.filter((slot) =>
        conflictSlots.includes(slot)
      );
      if (overlappingSlots.length > 0) {
        return res.json({
          error: "These slots are already booked",
          slots: overlappingSlots,
        });
      }
    }

    const user = await stripe.customers.create({
      metadata: {
        userId: req.user._id,
        turfId: turfId,
        advance: totalAdvance,
        date: req.body.date,
        totalAmount: totalAmount,
      },
    });

    const session = await stripe.checkout.sessions.create({
      customer: user.id,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: data.turfName,
              metadata: {
                id: turfId,
              },
            },
            unit_amount: totalAdvance * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${
        process.env.CLIENT_URL
      }/paymentSuccess?amount=${encodeURIComponent(
        totalAmount
      )}&advance=${encodeURIComponent(
        totalAdvance
      )}&turfId=${encodeURIComponent(turfId)}&date=${encodeURIComponent(
        date
      )}&selectedSlots=${encodeURIComponent(selectedSlots.join(","))}`,
      cancel_url: `${process.env.CLIENT_URL}/paymentFail`,
    });

    res.send({ url: session.url });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
};

const paymentSuccess = async (req, res) => {
  try {
    console.log("first");
    const details = req.body;
    console.log(details)
    if (details) {
      const booking = new bookingModel({
        user: req.user._id,
        turf: details.turfId,
        bookedDate: details.date,
        bookedSlots: details.selectedSlots,
        totalAdvance: details.advance,
        totalAmount: details.amount,
      });
      await booking.save();
      res.json({status:true})
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to save booking data" });
  }
};

module.exports = {
  createCheckOut,
  paymentSuccess,
};
