import React, { Component } from 'react';
import PricingPlans from './PricingPlans';
import './Subscriptions.css'; // Import the CSS file

class Subscriptions extends Component {
  constructor() {
    super();
    this.state = {
      subscribed: false,
      showPricingPlans: false,
    };
  }

  handleSubscription = () => {
    this.setState((prevState) => ({
      subscribed: !prevState.subscribed,
      showPricingPlans: !prevState.subscribed, // Toggle the display of PricingPlans
    }));
  };

  render() {
    const { subscribed, showPricingPlans } = this.state;

    return (
      <div>
        <h2>Subscription</h2>
        {subscribed ? (
          <div>
            <p>You are subscribed!</p>
            {showPricingPlans ? (
              <div>
                <PricingPlans />
                <button onClick={this.handleSubscription}>Unsubscribe</button>
              </div>
            ) : (
              <button onClick={this.handleSubscription}>Unsubscribe</button>
            )}
          </div>
        ) : (
          <div>
            <p>You are not subscribed.</p>
            <button onClick={this.handleSubscription}>Subscribe</button>
          </div>
        )}
      </div>
    );
  }
}

export default Subscriptions;
