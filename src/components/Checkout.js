import react, { useState } from "react";
import Plans from "./plans/Plans";
import { Stripe } from "./Payment/index";
import SubscriptionDetails from "./SubscriptionDetails/SubscriptionDetails";

const Checkout = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [proceedToPay, setProceedToPay] = useState(false);
  const [boughtPlan, setBoughtPlan] = useState(false);

  return boughtPlan ? (
    <SubscriptionDetails data ={boughtPlan}/>
  ) : !proceedToPay ? (
    <Plans
      selectedPlan={selectedPlan}
      setSelectedPlan={setSelectedPlan}
      setProceedToPay={setProceedToPay}
    />
  ) : (
    <Stripe selectedPlan={selectedPlan} setBoughtPlan={setBoughtPlan}/>
  );
};

export default Checkout;
