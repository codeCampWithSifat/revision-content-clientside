import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../Shared/Loading/Loading";
import { toast } from "react-hot-toast";

const AllUsers = () => {
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/users`);
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <Loading />;
  }

  const handleAdmin = (id) => {
    fetch(`http://localhost:5000/users/admin/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((adminData) => {
        // console.log(adminData);
        if (adminData.modifiedCount > 0) {
          toast.success("Make Admin Successfully");
          refetch();
        }
      });
  };

  const handleDeleteAdmin = (id) => {
    if (window.confirm("Are You Sure You Want To Delete This Admin")) {
      fetch(`http://localhost:5000/users/admin/${id}`, {
        method: "DELETE",
        headers : {
            authorization : `bearer ${localStorage.getItem("accessToken")}`
        }
      })
        .then((res) => res.json())
        .then((deleteAdminData) => {
          if (deleteAdminData.deletedCount > 0) {
            toast.success("Delete Admin Successfully");
            refetch();
          }
        });
    }
  };
  return (
    <div className="overflow-x-auto">
      <h2 className="text-primary font-bold text-xl my-10">
        Total Number Of Users : {users.length}
      </h2>
      <table className="table w-full">
        <thead className="text-center">
          <tr>
            <th>Sl.Number</th>
            <th>Name</th>
            <th>Email</th>
            <th>Make Admin</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {/* row 1 */}
          {users.map((user, index) => (
            <tr key={user._id}>
              <th>{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user?.role !== "admin" && (
                  <button
                    onClick={() => handleAdmin(user._id)}
                    className="btn btn-primary text-white btn-sm"
                  >
                    Make Admin
                  </button>
                )}
              </td>
              <td>
                <button
                  onClick={() => handleDeleteAdmin(user._id)}
                  className="btn btn-sm text-white btn-error"
                >
                  Delete Admin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
