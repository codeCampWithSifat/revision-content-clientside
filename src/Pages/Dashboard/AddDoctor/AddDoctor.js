import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import Loading from "../../Shared/Loading/Loading";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddDoctor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imageHostKey = process.env.REACT_APP_IMGBB_APIKEY;
  const navigate = useNavigate()

  const { data: appointmentSpecialty = [], isLoading } = useQuery({
    queryKey: ["appointmentSpecialty"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/appointmentSpecialty`);
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleAddDoctor = (data) => {
    const formData = new FormData();
    const image = data.image[0];
    //   console.log(image);
    formData.append("image", image);
    fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`,{
        method : "POST",
        body : formData
    })
    .then(res => res.json())
    .then(imageData => {
        if(imageData.success) {
            // console.log(imageData.data.url);
            const doctor ={
                name : data.name,
                email: data.email,
                specialty : data.specialty,
                image : imageData.data.url
            };

            fetch(`http://localhost:5000/doctors`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(doctor)
            })
            .then(res => res.json())
            .then(doctorData => {
                if(doctorData.insertedId) {
                    toast.success("Add Doctor Successfully")
                    navigate("/dashboard/managedoctors")
                }
            })
        }
    })
  };

  return (
    <div>
      <div className="h-[600px]  ">
        <div className="w-96 p-4">
          <h2 className="text-3xl text-center">Add A Doctor</h2>

          <form onSubmit={handleSubmit(handleAddDoctor)}>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text text-md mt-2"> Your Name</span>
              </label>
              <input
                {...register("name", { required: "Name is Required" })}
                type="text"
                className="input input-bordered w-full "
              />
              {errors.name && (
                <p role="alert" className="text-red-600 my-2">
                  {errors.name?.message}
                </p>
              )}
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text text-md"> Email</span>
              </label>
              <input
                {...register("email", { required: "Email is Required" })}
                type="email"
                className="input input-bordered w-full "
              />
              {errors.email && (
                <p role="alert" className="text-red-600 my-2">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text text-md">Pick Your Specialty</span>
              </label>
              <select
                {...register("specialty", {
                  required: "Specialty is Required",
                })}
                className="select select-bordered w-full "
              >
                {appointmentSpecialty.map((specialty) => (
                  <option key={specialty._id} value={specialty.name}>
                    {specialty.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text text-md">Pick Your Photo</span>
              </label>
              <input
                {...register("image", { required: "Photo is Required" })}
                type="file"
                className="input input-bordered w-full "
              />
              {errors.image && (
                <p role="alert" className="text-red-600 my-2">
                  {errors.image?.message}
                </p>
              )}
            </div>

            <input
              type="submit"
              className="input input-bordered w-full bg-primary text-white my-4"
              value="Add Doctor"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
