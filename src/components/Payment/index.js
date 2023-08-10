import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePayment from "./StripePayment";

const stripePromise = loadStripe(process.env.REACT_APP_PK);
export const Stripe = ({ selectedPlan, setBoughtPlan }) => {
  return (
    <Elements stripe={stripePromise}>
      <StripePayment selectedPlan={selectedPlan} setBoughtPlan={setBoughtPlan}/>
    </Elements>
  );
};
