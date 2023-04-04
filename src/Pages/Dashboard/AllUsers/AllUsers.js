import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../Shared/Loading/Loading";

const AllUsers = () => {
  const { data: users = [], isLoading } = useQuery({
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
  return (
    <div className="overflow-x-auto">
        <h2 className="text-primary font-bold text-xl my-10">Total Number Of Users : {users.length}</h2>
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
                <button className="btn btn-sm">Make Admin</button>
              </td>
              <td>
                <button className="btn btn-sm btn-error">Delete Admin</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
