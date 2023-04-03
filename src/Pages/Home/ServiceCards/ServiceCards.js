import React from "react";
import ServiceCard from "./ServiceCard";
import fluoride from "../../../assets/images/fluoride.png";
import cavity from "../../../assets/images/cavity.png";
import whitening from "../../../assets/images/whitening.png";

const ServiceCards = () => {
  const servicesData = [
    {
      id: 1,
      name: "Fluoride Treatment",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly",
      image: fluoride,
    },
    {
      id: 2,
      name: "Cavity Treatment",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly",
      image: cavity,
    },
    {
      id: 3,
      name: "Teeth Whitening",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly",
      image: whitening,
    },
  ];
  return (
    <div className="mt-28">
      <div className="text-center">
        <h2 className="text-primary font-bold text-md">Our Services</h2>
        <h2 className="text-3xl ">Services We Provide</h2>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
        {servicesData.map((service) => (
          <ServiceCard key={service.id} service={service}></ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default ServiceCards;
