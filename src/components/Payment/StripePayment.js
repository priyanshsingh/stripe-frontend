import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { fetchPaymentIntent, updateUserPlan } from "../../services/payments";
import CardSection from "../CardSection/CardSection";
import "./StripePaymentStyles.css";

export default function StripePayment({ selectedPlan, setBoughtPlan }) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const [planId, setSelectedPlanId] = useState(5);

  useEffect(() => {
    if (selectedPlan) {
      setSelectedPlanId(selectedPlan._id);
    }
  });


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    const planData = { planId: planId, plan: selectedPlan };
    const paymentIntent = await fetchPaymentIntent(planData);
    const clientSecret = paymentIntent.client_secret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: `test`,
        },
      },
    });
    setPaymentResult(result);
    setLoading(false);

    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        elements.getElement(CardElement).clear();
        updateUserPlan(selectedPlan._id);
        setBoughtPlan(selectedPlan)
      }
    }
  };

  return (
    <div className="stripe-payment-container">
      <form onSubmit={handleSubmit} className={loading ? "dimmed" : ""}>
        <h2>Plan Selected: {selectedPlan.plan} </h2>
        <CardSection />
        <button disabled={!stripe || loading}>Place Order</button>
      </form>
      {loading && (
        <div className="loading-overlay">
          <div className="loader"></div>
        </div>
      )}
      {paymentResult && !paymentResult.error && (
        <div
          className={`result ${
            paymentResult.paymentIntent.status === "succeeded"
              ? "success"
              : "failure"
          }`}
        >
          {paymentResult.paymentIntent.status === "succeeded"
            ? "Payment Successful!"
            : "Payment Failed"}
        </div>
      )}
      {paymentResult && paymentResult.error && (
        <div className={`result failure`}>
          {`Payment Failed - ${paymentResult.error.message}`}
        </div>
      )}
    </div>
  );
}
