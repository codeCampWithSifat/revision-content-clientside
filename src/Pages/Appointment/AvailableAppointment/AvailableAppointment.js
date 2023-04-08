import React, {  useState } from "react";
import AvailableOption from "../AvailableOption/AvailableOption";
import BookingModal from "../BookingModal/BookingModal";
import Loading from "../../Shared/Loading/Loading";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";

const AvailableAppointment = ({ selectedDate }) => {
  const [treatment, setTreatment] = useState(null);
  const date = format(selectedDate,"PP");

  const {data:appointmentOptions=[], isLoading, refetch} = useQuery({
    queryKey : ["appointmentOptions", date],
    queryFn : async() => {
      const res = await fetch(`https://revision-content-serverside.vercel.app/appointmentOptions?date=${date}`);
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
          refetch={refetch}
        ></BookingModal>
      )}
    </div>
  );
};

export default AvailableAppointment;
