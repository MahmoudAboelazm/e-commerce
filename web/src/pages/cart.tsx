import {
  Button,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Stripe from "../components/Cart/Payment/stripe";
import Checkout from "../components/Cart/Checkout/checkout";
import Items from "../components/Cart/Items/items";
import Nav from "../components/Nav/Nav";
import { rootReducer } from "../new-redux/configure-store";
import useStyles from "../styles/Home.module";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { trackingRouterChange } from "../utils/trackingRouterChange";

function getSteps() {
  return ["SHOPPING CART", "CHECKOUT DETAILS", "PAYMENT"];
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const getStepContent = (stepIndex: number, nextStep: Function) => {
  switch (stepIndex) {
    case 0:
      return <Items nextStep={nextStep} />;
    case 1:
      return <Checkout nextStep={nextStep} />;
    case 2:
      return (
        <Elements stripe={stripePromise}>
          <Stripe nextStep={nextStep} />
        </Elements>
      );

    default:
      return "Unknown stepIndex";
  }
};
const Cart: NextPage<any> = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const loading = trackingRouterChange();
  const cartItemsLength = useSelector(
    (state: ReturnType<typeof rootReducer>) => state.cart.list.length,
  );

  return (
    <>
      <Head>
        <title>Cart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />
      <Container className={classes.mainContainer}>
        {loading ? (
          "Loading..."
        ) : cartItemsLength == 0 ? (
          "No products in the cart"
        ) : (
          <div>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <div>
              {activeStep === steps.length ? (
                <div>
                  <Typography variant="subtitle1">
                    Congratulations your fake order will be delivered within
                    10000 years!!
                  </Typography>
                </div>
              ) : (
                <div>
                  {getStepContent(activeStep, handleNext)}
                  <div>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                      Back
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </>
  );
};

export default Cart;
