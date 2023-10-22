import React, { useState } from 'react';
import './PricingPlans.css';
import './Subscriptions.css'; 

function PricingPlans() {
  const [showPricingPlans, setShowPricingPlans] = useState(false);
  const [freePlanActivated, setFreePlanActivated] = useState(false);

  const activatePricingPlans = () => {
    setShowPricingPlans(true);
  };

  const handleFreePlanActivation = () => {
    setFreePlanActivated(true);
  };

  return (
    <div className="pricing-plans">
      {showPricingPlans ? (
        <div>
          <div className="pricing-card">
            <h2>Free Plan</h2>
            <p>Get started with our basic features.</p>
            <button
              className="free-button"
              onClick={handleFreePlanActivation}
              disabled={freePlanActivated}
            >
              {freePlanActivated ? "Free Plan Activated" : "Free"}
            </button>
          </div>

          <div className="pricing-card">
            <h2>Premium Plan</h2>
            <p>Unlock all premium features for maximum value.</p>
            <ul>
              {/* Premium plan features */}
            </ul>
            <p>Price: 1000rs</p>
            <a href="https://buy.stripe.com/test_14k2b7aV2bqW0w09AA">
              <button className="premium-button">Get Premium</button>
            </a>
          </div>
        </div>
      ) : (
        <div className="pricing-card">
          <h2>Subscriptions</h2>
          <button onClick={activatePricingPlans}>Activate Pricing Plans</button>
        </div>
      )}
    </div>
  );
}

export default PricingPlans;
