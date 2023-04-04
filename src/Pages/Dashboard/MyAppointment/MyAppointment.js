import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import Loading from "../../Shared/Loading/Loading";

const MyAppointment = () => {
  const { user } = useContext(AuthContext);
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/bookings?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h3 className="text-primary text-xl my-8">
        <span className="font-bold">{user?.displayName}</span> Appointments
        Number : <span className="font-bold">{bookings.length}</span>
      </h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead className="text-center">
            <tr>
              <th>Sl.Number</th>
              <th>Name</th>
              <th>Treatment</th>
              <th>Date</th>
              <th>Time</th>
              <th>Payment Option</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {bookings.map((book, index) => (
              <tr key={book._id}>
                <th>{index + 1}</th>
                <td>{book.patientName}</td>
                <td>{book.treatmentName}</td>
                <td>{book.appointmentDate}</td>
                <td>{book.slot}</td>
                <td>
                  <button className="btn btn-outline btn-sm">Pay</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointment;
