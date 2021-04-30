import { Button, CircularProgress, Typography } from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { Alert } from "@material-ui/lab";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { cardStyleOptions, useStyles } from "./styles";
interface StripeProps {
  nextStep: Function;
}

const Stripe: React.FC<StripeProps> = ({ nextStep }) => {
  const classes = useStyles();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [copySuccess, setCopySuccess] = useState(false);
  const copyToClipBoard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/create-payment-intent`, {
        method: "POST",
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      nextStep();
    }
  };

  return (
    <div className={classes.card}>
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          className={classes.cardElement}
          options={cardStyleOptions}
          onChange={handleChange}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          fullWidth
          disabled={processing || disabled || succeeded}
          id="submit"
          type="submit"
        >
          <span id="button-text">
            {processing ? (
              <CircularProgress className={classes.spinner} />
            ) : (
              "Pay and Place order"
            )}
          </span>
        </Button>

        {error && <Alert severity="error">{error}</Alert>}
        {succeeded && <Alert severity="success">Payment succeeded.</Alert>}
      </form>

      <div className={classes.testPayment}>
        <span>
          <Typography variant="subtitle1"> Make a test payment</Typography>
        </span>
        <div>
          <Typography>
            Payment succeeds{" "}
            <span onClick={() => copyToClipBoard(4242424242424242)}>
              4242 4242 4242 4242 <FileCopyIcon fontSize="inherit" />
            </span>
          </Typography>
          <Typography>
            Payment is declined{" "}
            <span onClick={() => copyToClipBoard(4000000000009995)}>
              4000 0000 0000 9995 <FileCopyIcon fontSize="inherit" />
            </span>
          </Typography>
          {copySuccess && (
            <Alert severity="success">Copied to clipboard!</Alert>
          )}
        </div>
      </div>
    </div>
  );
};
export default Stripe;
