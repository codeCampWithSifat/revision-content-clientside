import React from "react";
import treamtment from "../../../assets/images/treatment.png";

const DentalTreatment = () => {
  return (
    <div className="hero min-h-screen ">
      <div className="hero-content flex-col lg:flex-row">
        <img src={treamtment} alt="" className="max-w-sm rounded-lg shadow-2xl" />
        <div className="mx-12">
          <h1 className="text-5xl font-bold">
            Exceptional Dental Care, <br /> On Your Terms
          </h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary text-white">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default DentalTreatment;
