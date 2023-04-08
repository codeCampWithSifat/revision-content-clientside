import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Loading from "../../Shared/Loading/Loading";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";
import { toast } from "react-hot-toast";

const ManageDoctors = () => {
  const [deletingDoctor, setDeletingDoctor] = useState(null);
  const closeModal = () => {
    setDeletingDoctor(null);
  };

  const handleDeleteDoctor = (doctor) => {
    fetch(`https://revision-content-serverside.vercel.app/doctors/${doctor._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((deleteDoctor) => {
        if (deleteDoctor.deletedCount > 0) {
          toast.success(`Doctor ${doctor.name} Deleted Successfully`);
          refetch();
        }
      });
  };
  const {
    data: doctors = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      try {
        const res = await fetch(`https://revision-content-serverside.vercel.app/doctors`, {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h2 className="text-indigo-700 font-bold text-xl my-6">
        Total Number Of Doctors {doctors?.length}
      </h2>
      <div className="">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th>SL Number</th>
              <th>Avater</th>
              <th>Name</th>
              <th>Email</th>
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
                  <img className="w-10 rounded-xl" src={doctor.image} alt="" />
                </td>
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td>{doctor.specialty}</td>
                <td>
                  <label
                    onClick={() => setDeletingDoctor(doctor)}
                    htmlFor="confirmation-modal"
                    className="btn btn-sm btn-error text-white"
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deletingDoctor && (
        <ConfirmationModal
          title={`Are You Sure Want To Delete`}
          message={`Warning If You Delete ${deletingDoctor.name} You Can't Recover It`}
          closeModal={closeModal}
          handleDeleteDoctor={handleDeleteDoctor}
          modalData={deletingDoctor}
          successButtonName="Delete"
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default ManageDoctors;
