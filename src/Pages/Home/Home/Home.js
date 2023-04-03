import React from "react";
import Banner from "../Banner/Banner";
import Cards from "../Cards/Cards";
import ServiceCards from "../ServiceCards/ServiceCards";
import DentalTreatment from "../DentalTreatment/DentalTreatment";
import MakeAppointment from "../MakeAppointment/MakeAppointment";
import Reviews from "../Reviews/Reviews";
import ContactUs from "../ContactUs/ContactUs";
import 'react-day-picker/dist/style.css';


const Home = () => {
  return (
    <div className="">
      <Banner />
      <Cards />
      <ServiceCards />
      <DentalTreatment />
      <MakeAppointment />
      <Reviews />
      <ContactUs />
    </div>
  );
};

export default Home;
