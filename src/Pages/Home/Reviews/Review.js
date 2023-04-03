import React from "react";

const Review = ({ review }) => {
  const { name, description, location, img } = review;
  return (
    <div className="mt-12 card shadow-xl p-4">
      <div>
       <p>{description}</p>
      </div>
      <div className="flex mt-8">
        <img src={img} alt="" />
        <div className="my-4 ml-4">
            <h2>{name}</h2>
            <h2>{location}</h2>
        </div>
      </div>
    </div>
  );
};

export default Review;
