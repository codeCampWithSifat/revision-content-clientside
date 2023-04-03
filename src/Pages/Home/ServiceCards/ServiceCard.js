import React from "react";

const ServiceCard = ({service}) => {
    const {name, image, description} = service
  return (
    <div className="card  glass mt-12 p-4">
      <figure>
        <img
          src={image}
          alt="car!"
        />
      </figure>
      <div className="card-body text-center">
        <h2 className="text-2xl font-bold text-center">{name}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
