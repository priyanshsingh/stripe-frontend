import React from 'react';
import './SubscriptionDetails.css'; // Make sure to create this CSS file for your component styling
import moment from 'moment';


const SubscriptionDetails = ({ data }) => {
    const { plan, price, videoQuality, resolution, devices, screens, isActive = true } = data;
    const subscriptionStatus = isActive ? 'Active' : 'Canceled';

    const subscriptionDuration = isActive ? '1 year' : '1 month';
    const expiryDate = moment().add(subscriptionDuration, 'year'); // Use 'month' for monthly subscriptions
  
    const renderAction = () => {
      if (isActive) {
        return <button className="cancel-button">Cancel</button>;
      } else {
        return <button className="buy-button">Buy</button>;
      }
    };
  
    return (
      <div className="subscription-container">
        <div className={`status-pill ${isActive ? 'active' : 'canceled'}`}>
          {subscriptionStatus}
        </div>
        <h2 className="subscription-heading">Current Plan Details</h2>
        <div className="plan-details">
          <p>{plan}</p>
          <p className="price">₹{isActive ? price.yearly : price.monthly}</p>
          <p>{devices.join(', ')}</p>
          <p>{resolution}</p>
          <p>{screens} Screen(s)</p>
        </div>
        <div className="subscription-footer">
          <div className="expiry-box">
            <p>Subscription {isActive ? 'Active' : 'Canceled'} till {expiryDate.format('MMMM D, YYYY')}</p>
          </div>
          {renderAction()}
        </div>
      </div>
    );
  };
  
  export default SubscriptionDetails;