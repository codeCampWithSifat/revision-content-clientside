import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPEPK);
const Payment = () => {
  const booking = useLoaderData();

  const { treatmentName, price, appointmentDate, slot } = booking;
  return (
    <div>
      <h1 className="text-indigo-700 text-2xl font-bold">
        Payment For {treatmentName}{" "}
      </h1>
      <p className="text-indigo-700 text-xl mt-5">
        Pay <strong>${price}</strong> On {appointmentDate} at slot {slot}
      </p>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
