import React from "react";
import chair from "../../../assets/images/chair.png";

const Banner = () => {
  return (
    <div className="hero h-3/4 mt-12">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src={chair}
          alt=""
          className=" lg:w-2/4 rounded-lg shadow-2xl md:w-full sm:w-full "
        />
        <div>
          <h1 className="text-5xl font-bold">Your New Smile Starts Here</h1>
          <p className="py-6">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy
          </p>
          <button className="btn btn-primary text-white">Getting Started</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
