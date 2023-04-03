import React from "react";
import doctor from "../../../assets/images/doctor.png";
import appointment from "../../../assets/images/appointment.png";

const MakeAppointment = () => {
  return (
    <div
      style={{
        background: `url(${appointment})`,
      }}
    >
      <div className="card card-side  shadow-xl">
        <img className="w-1/2 -mt-28" src={doctor} alt="Movie" />

        <div className="mt-24 p-4">
          <h2 className="text-primary font-bold ">Appointment</h2>
          <h2 className="text-3xl text-white mt-4">Make An Appointment</h2>
          <p className="text-white my-8">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English.
          </p>
          <div className="card-actions justify-start my-5">
            <button className="btn btn-primary text-white">
              Getting Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeAppointment;
