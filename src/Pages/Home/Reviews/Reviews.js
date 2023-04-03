import React from "react";
import Review from "./Review";
import quote from "../../../assets/icons/quote.svg";
import people1 from "../../../assets/images/people1.png";
import people2 from "../../../assets/images/people2.png";
import people3 from "../../../assets/images/people3.png";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Sifat Sayed",
      description:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      location: "California",
      img: people1,
    },
    {
      id: 2,
      name: "Fahim Canaria",
      description:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      location: "United Kingdom",
      img: people2,
    },
    {
      id: 3,
      name: "Junayed Siddque",
      description:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      location: "Canada",
      img: people3,
    },
  ];
  return (
    <div className="mt-24">
      <div className="flex justify-between">
        <div>
          <h2 className="text-primary font-bold text-xl">Testimonials</h2>
          <h2 className="text-3xl">What Our Patient Says ? </h2>
        </div>
        <div>
          <img className="w-72" src={quote} alt="" />
        </div>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 ">
        {
            reviews.map(review => <Review key={review.id}
                review={review}
            ></Review>)
        }
      </div>
    </div>
  );
};

export default Reviews;
