import { Elements } from "@stripe/react-stripe-js";
import MyCheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
// const stripePromise = loadStripe("pk_live_Li43aRG4h4ti2wna2i0k87Tf0093MPCzVZ");
const stripePromise = loadStripe("pk_test_Ey2p2N4zmrg5nqZrLTpcPg4h00MJSdtjP2");

const App = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <MyCheckoutForm shipping_id = {props.shipping_id}/>
    </Elements>
  );
};

export default App;
