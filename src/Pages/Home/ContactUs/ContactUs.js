import React from "react";
import appointment from "../../../assets/images/appointment.png";

const ContactUs = () => {
  return (
    <div
      style={{
        background: `url(${appointment})`,
        height: "80vh",
      }}
    >
      <div className="text-center mt-12">
        <h3 className="text-primary font-bold">Contact Us</h3>
        <h2 className="text-2xl text-white">Stay Connected With Us</h2>
      </div>

      <div className="text-center mt-12">
        <form className="">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="input input-bordered w-1/2 "
          /> <br />
          <input
            type="text"
            placeholder="Your Email Subject"
            className="input input-bordered  w-1/2 my-4"
          /> <br />
          <input
            type="text"
            placeholder="Your Message"
            className="input input-bordered  w-1/2 "
          /> <br />
          <input
            type="submit"
            value="Submit"
            className="  w-1/2  btn my-4"
          />
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
