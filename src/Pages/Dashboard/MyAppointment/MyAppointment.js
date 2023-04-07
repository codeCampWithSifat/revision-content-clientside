import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import Loading from "../../Shared/Loading/Loading";
import { Link } from "react-router-dom";

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
              <th>Price</th>
              <th>Payment Option</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <th>{index + 1}</th>
                <td>{booking.patientName}</td>
                <td>{booking.treatmentName}</td>
                <td>{booking.appointmentDate}</td>
                <td>{booking.slot}</td>
                <td>${booking.price}</td>
                {booking.price && !booking.paid && (
                  <td>
                    <Link to={`/dashboard/payment/${booking._id}`}>
                      <button className="btn btn-outline btn-sm">Pay</button>
                    </Link>
                  </td>
                )}
                {booking.price && booking.paid && (
                  <td>
                    <span className="text-primary">Payment Successfull</span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointment;
