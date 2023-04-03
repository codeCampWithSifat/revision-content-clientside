import React, {  useState } from "react";
import AvailableOption from "../AvailableOption/AvailableOption";
import BookingModal from "../BookingModal/BookingModal";
import Loading from "../../Shared/Loading/Loading";
import { format } from "date-fns";
import { useQuery } from "react-query";

const AvailableAppointment = ({ selectedDate }) => {
  const [treatment, setTreatment] = useState(null);

  const {data:appointmentOptions=[], isLoading} = useQuery({
    queryKey : ["appointmentOptions"],
    queryFn : async() => {
      const res = await fetch(`http://localhost:5000/appointmentOptions`);
      const data = await res.json();
      return data
    }
  })

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <div className="text-primary text-center font-bold mt-12">
        <h2 className="text-2xl text-primary font-bold">
          Your Appointment Date {format(selectedDate, "PP")}
        </h2>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 mt-12">
        {appointmentOptions.length === 0 ? (
          <Loading />
        ) : (
          appointmentOptions.map((option, index) => (
            <AvailableOption
              key={index}
              option={option}
              setTreatment={setTreatment}
            ></AvailableOption>
          ))
        )}
      </div>

      {treatment && (
        <BookingModal
          treatment={treatment}
          setTreatment={setTreatment}
          selectedDate={selectedDate}
        ></BookingModal>
      )}
    </div>
  );
};

export default AvailableAppointment;
