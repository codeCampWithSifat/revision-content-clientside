import React, { useContext } from "react";
import { format } from "date-fns";
import { AuthContext } from "../../../Context/AuthProvider";
import { toast } from "react-hot-toast";

const BookingModal = ({ treatment, setTreatment, selectedDate }) => {
  const { name: serviceName, slots, price } = treatment;
  const date = format(selectedDate, "PP");

  const { user } = useContext(AuthContext);

  const handleBooking = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const slot = form.slot.value;
    const price = form.price.value;

    const booking = {
      appointmentDate: date,
      treatmentName: serviceName,
      patientName: name,
      email,
      slot,
      price,
      phone,
    };

    fetch(`http://localhost:5000/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.acknowledged) {
          toast.success("Booked Your Seat Sucessfully")
          setTreatment(null);
        }
      });
  };
  return (
    <div>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div>
            <form className="text-center" onSubmit={handleBooking}>
              <h2 className="font-bold text-primary text-xl">{serviceName}</h2>
              <input
                type="text"
                name="date"
                value={date}
                className="input input-bordered input-info w-full max-w-xs my-3"
                disabled
              />
              <select
                name="slot"
                className="select select-info w-full max-w-xs"
              >
                {slots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="name"
                value={user?.displayName}
                className="input input-bordered input-info w-full max-w-xs my-3"
                required
                disabled
              />
              <input
                type="email"
                name="email"
                value={user?.email}
                className="input input-bordered input-info w-full max-w-xs my-3"
                required
                disabled
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="input input-bordered input-info w-full max-w-xs my-3"
                required
              />
              <input
                type="text"
                name="price"
                placeholder="Service Price"
                value={`${price}`}
                className="input input-bordered input-info w-full max-w-xs my-3"
                disabled
              />
              <input
                type="submit"
                value="Submit Now"
                className="btn btn-primary text-white w-full max-w-xs my-3"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
