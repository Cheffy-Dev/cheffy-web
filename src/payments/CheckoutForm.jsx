import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
// import { loadStripe } from "@stripe/stripe-js";
// const stripePromise = loadStripe("pk_test_Ey2p2N4zmrg5nqZrLTpcPg4h00MJSdtjP2");
import axiosClient from "../utils/axios-config";

function MyCardElement({ onChange }) {
  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#d73d36",
        color: "#000",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": {
          color: "#000",
        },
        "::placeholder": {
          color: "#cc9696",
        },
      },
      invalid: {
        iconColor: "#d73d36",
        color: "#000",
      },
    },
  };
  return <CardElement options={CARD_OPTIONS} onChange={onChange} />;
}

const MyCheckoutForm = (props) => {
  const [session, loading] = useSession();
  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);

  const stripePaymentMethodHandler = async (result) => {
    if (result.error) {
      // Show error in payment form
      console.log(result.message);
      setError(`Payment failed. ${response.error}`);
      setProcessing(false);
    } else {
      // Otherwise send paymentMethod.id to your server
      setProcessing(true); 
      const res = await axiosClient.post("/custom-plate/stripePay/", {
          payment_method_id: result.paymentMethod.id,
          shipping_id: props.shipping_id,
          deliveryType: "driver",
          paymentType: "card",
        });
      const paymentResponse = await res;
        console.log(paymentResponse)
      // Handle server response
      await handleServerResponse(paymentResponse);
    }
  };

  const handleServerResponse = async (response) => {
    if (response.error) {
      // Show error from server on payment form
      setError(`Payment failed ${response.message}`);
      setProcessing(false);
    } else if (response.requires_action) {
      // Use Stripe.js to handle the required card action
      const { error: errorAction, paymentIntent } =
        await stripe.handleCardAction(response.payment_intent_client_secret);

      if (errorAction) {
        // Show error from Stripe.js in payment form
        console.log(errorAction);
        setError(`Payment failed. ${errorAction.message}`);
        setProcessing(false);
      } else {
        // The card action has been handled
        // The PaymentIntent can be confirmed again on the server
        const serverResponse = await fetch("/custom-plate/stripePay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payment_intent_id: paymentIntent.id }),
        });
        handleServerResponse(await serverResponse.json());
      }
    } else {
      // Show success message
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      console.log("success")
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) {
      console.log("no stripe");
      return;
    }
    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name: session.user.email,
      },
    });

    stripePaymentMethodHandler(result);
    // const payload = {
    //   shipping_id: props.shipping_id,
    //   deliveryType: ,
    //   paymentType: "card",
    //   cardId: ,
    //   cvcNumber: }
    // const res = await axiosClient.post("/customPlate/pay", payload);

    // if (payload.error) {
    //   setError(`Payment failed ${payload.error.message}`);
    //   setProcessing(false);
    // } else {
    // console.log("success")
    //   setError(null);
    //   setProcessing(false);
    //   setSucceeded(true);
    // }
  };
  return (
    <div style={{ minWidth: 360, width: "100%" }}>
      <form onSubmit={handleSubmit} style={{ minWidth: 360, width: "100%" }}>
        <MyCardElement onChange={handleChange} />
        <button
          type="submit"
          disabled={!stripe || processing}
          className="text-2xl h-auto mt-6"
          style={{
            backgroundColor: "#d73d36",
            width: "100%",
            minWidth: 360,
          }}
        >
          <p className="text-2xl py-2" style={{ color: "#fff" }}>
            Pay
          </p>
        </button>
      </form>
      <div className="py-4">
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment succeeded We have also sent you a copy of your order on your
          email.
        </p>
      </div>
    </div>
  );
};

export default MyCheckoutForm;
