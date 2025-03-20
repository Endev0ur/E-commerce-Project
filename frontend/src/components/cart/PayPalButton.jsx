import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import axios from 'axios'

console.log("ye page load hua");

const PayPalButton = ({ amount, onSuccess, onError }) => {
  // Ensure PayPal Client ID is available
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  console.log("Client id is : ",clientId)
  if (!clientId) {
    console.error("PayPal Client ID is missing. Please check your .env file.");
    return null; // Prevent rendering if there's no Client ID
  }

  return (
    <PayPalScriptProvider options={{ "client-id": clientId }}>
      <PayPalButtons
        style={{ layout: 'vertical' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              { amount: { value: parseFloat(amount || 0).toFixed(2) } }
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture()
            .then((details) => {
              console.log("Payment successful:", details);
              onSuccess(details);
            })
            .catch((err) => {
              console.error("Payment capture error:", err);
              onError(err);
            });
        }}
        onError={(err) => {
          console.error("PayPal error:", err);
          onError(err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
