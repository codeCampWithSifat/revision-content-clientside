import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../Shared/Loading/Loading";

const ManageDoctors = () => {
  const { data: doctors = [], isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/doctors`);
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h2 className="text-indigo-700 font-bold text-xl my-6">
        Total Number Of Doctors {doctors.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th>SL Number</th>
              <th>Avater</th>
              <th>Name</th>
              <th>Specialty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {doctors.map((doctor, index) => (
              <tr key={doctor._id}>
                <th>{index + 1}</th>
                <td>
                  {" "}
                  <img className="w-12 rounded-xl" src={doctor.image} alt="" />
                </td>
                <td>{doctor.name}</td>
                <td>{doctor.specialty}</td>
                <td>
                  <button className="btn btn-sm btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDoctors;
