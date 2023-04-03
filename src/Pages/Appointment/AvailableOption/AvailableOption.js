import React from "react";

const AvailableOption = ({ option, setTreatment }) => {
  const { name, price, slots } = option;
  return (
    <div className="card  shadow-xl">
      <div className="card-body items-center">
        <h2 className="card-title text-primary">{name}</h2>
        <p>{slots.length > 0 ? slots[0] : "Try Another Day"}</p>
        <p>
          {slots.length} {slots.length === 0 ? "Space" : "Spaces"} Are Available
        </p>
        <p>Booking Per Slot ${price}</p>
        <div className="card-actions justify-center">
          <label
            htmlFor="booking-modal"
            disabled={slots.length === 0}
            className="btn btn-primary w-full text-white"
             onClick={() => setTreatment(option)}
          >
            Booked Appointment
          </label>
          {/* <label htmlFor="booking-modal" className="btn">
            open modal
          </label> */}
        </div>
      </div>
    </div>
  );
};

export default AvailableOption;
