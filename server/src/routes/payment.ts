import express from "express";

const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_KEY);

const calculateOrderAmount = async () => {
  // For real app you will fetch the cart from the database then calculate the order amount.
  return 100;
};
router.post("/create-payment-intent", async (_, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: await calculateOrderAmount(),
    currency: "usd",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
module.exports = router;
