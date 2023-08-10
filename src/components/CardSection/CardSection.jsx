import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
import "./CardSectionStyles.css";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#333", // Font color
      fontWeight: "500",
      fontFamily: "Roboto, Arial, sans-serif",
      fontSize: "16px",
      "::placeholder": {
        color: "#87BBFD", // Placeholder color
      },
    },
    invalid: {
      color: "#FFC7EE", // Invalid input color
    },
  },
};

function CardSection() {
  return (
    <div className="card-section">
      <label className="card-label">Card Details</label>
      <div className="card-element-container">
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>
    </div>
  );
}

export default CardSection;
