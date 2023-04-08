import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({ booking }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const { price, email, patientName, _id , treatmentName} = booking;
  const [clientSecret, setClientSecret] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetch(`https://revision-content-serverside.vercel.app/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setClientSecret(data.clientSecret);
      });
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    //  setCardError("")
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("error", error);
      setCardError(error.message);
    } else {
      setCardError("");
      console.log("paymentMethod", paymentMethod);
    }

    setSuccess("");
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: patientName,
            email: email,
          },
        },
      });
    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      //   setSuccess("Congrates Your Payment Successfull");
      //   setTransactionId(paymentIntent.id);

      // save CheckoutInformation to the database
      const payment = {
        patientName,
        treatmentName,
        price,
        transactionId : paymentIntent.id,
        email,
        bookingId : _id
      };
      fetch(`https://revision-content-serverside.vercel.app/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertedId) {
            setSuccess("Congrates Your Payment Successfull");
            setTransactionId(paymentIntent.id);
          }
        });
    }
    setProcessing(false);
  };
  return (
    <div className="w-96 mt-10">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className="btn btn-sm btn-accent text-white mt-8"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-800 mt-4">{cardError}</p>}
      {success && (
        <div className="mt-6">
          <p className="text-green-800">{success}</p>
          <p className="text-green-800">
            Your TransactionId :{" "}
            <strong className="font-bold">{transactionId}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
