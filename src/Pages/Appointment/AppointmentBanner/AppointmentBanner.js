import React from "react";
import chair from "../../../assets/images/chair.png";
import { DayPicker } from "react-day-picker";

const AppointmentBanner = ({selectedDate,  setSelectedDate}) => {

  return (
    <div>
      <div className="hero  ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div>
            <img src={chair} className=" lg:w-3/4 md:w-full sm:w-full" alt="" />
          </div>
          <div>
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBanner;
