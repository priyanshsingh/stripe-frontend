import React, { useEffect, useState } from "react";
import "./Plans.css";
import axios from "../../config";

const Plans = ({ selectedPlan, setSelectedPlan, setProceedToPay }) => {
  const [showYearly, setShowYearly] = useState(true);
  const [plans, setPlans] = useState(null);

  useEffect(() => {
    if (!plans) {
      axios
        .get("/plan/get")
        .then((res) => setPlans(res.data))
        .catch((error) => console.error(error));
    }
  }, [plans]);

  const toggleBilling = () => {
    setShowYearly(!showYearly);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const getPlanPrice = (plan) => {
    return showYearly ? plan.price.yearly : plan.price.monthly;
  };

  return plans ? (
    <div className="plan-table">
      <h2>Choose the right plan for you</h2>
      <div className="toggle-container">
        <button
          className={`toggle-button ${showYearly ? "active" : ""}`}
          onClick={toggleBilling}
        >
          Yearly
        </button>
        <button
          className={`toggle-button ${showYearly ? "" : "active"}`}
          onClick={toggleBilling}
        >
          Monthly
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            {plans.map((plan) => (
              <th
                key={plan._id}
                className={`plan-header ${selectedPlan && selectedPlan.plan === plan.plan ? "selected" : ""
                  }`}
                onClick={() => handlePlanSelect(plan)}
              >
                {plan.plan}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(plans[0]).map((attribute) => {
            if (!["plan", "_id"].includes(attribute)) {
              return (
                <tr key={attribute}>
                  <td>{attribute === "price" ? "Price" : attribute}</td>
                  {plans.map((plan) => (
                    <td
                      key={plan.plan}
                      className={selectedPlan && selectedPlan.plan === plan.plan ? "selected" : ""}
                    >
                      {attribute === "price"
                        ? getPlanPrice(plan)
                        : plan[attribute]}
                    </td>
                  ))}
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
      <button
        className="proceed-button"
        disabled={!selectedPlan}
        onClick={() => {
          setProceedToPay(true);
        }}
      >
        Proceed to Pay
      </button>
    </div>
  ) : (
    <div className="loading-overlay">
      <div className="loader"></div>
    </div>
  );
};

export default Plans;
