import { CardElement } from "@stripe/react-stripe-js";

export default function MyCardElement() {
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
  return <CardElement options={CARD_OPTIONS} />;
}
