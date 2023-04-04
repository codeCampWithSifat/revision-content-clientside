import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import { toast } from "react-hot-toast";
import useToken from "../../../hooks/useToken";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updatedName, googleLogin } = useContext(AuthContext);
  const [singUpError, setSignUpError] = useState("");
  const navigate = useNavigate();
  const [createdUserEmail, setCreatedUserEmail] = useState("")
  const [token] = useToken(createdUserEmail);

  if(token) {
    navigate("/")
  }

  const handleSignUp = (data) => {
    console.log(data);
    setSignUpError("");
    createUser(data.email, data.password)
      .then((res) => {
        // const user = res.user;
        // console.log(user);
        toast.success("User Created Successfully");
        updatedName({ displayName: data.name })
          .then(() => {
            saveUser(data.name, data.email);
          })
          .catch((error) => {
            setSignUpError(error.message);
          });
      })
      .catch((error) => {
        setSignUpError(error.message);
      });
  };

  const saveUser = (name, email) => {
    const user = { name, email };
    fetch(`http://localhost:5000/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setCreatedUserEmail(email)
      });
  };

  // token related code is here
  // const getUserToken = (email) => {
  //   fetch(`http://localhost:5000/jwt?email=${email}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // console.log(data);
  //       if(data.accessToken) {
  //         localStorage.setItem("accessToken", data.accessToken)
  //         navigate("/")
  //       }
        
  //     });
  // };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        const googleUser = {name:user.displayName, email:user.email};
        fetch(`http://localhost:5000/users/${user?.email}`, {
          method : "PUT",
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify(googleUser)
        })
        .then(res => res.json())
        .then(data => {
          if(data.acknowledged) {
            setCreatedUserEmail(user?.email)
          }
        })
      })
      .catch((error) => {
        setSignUpError(error.message);
      });
  };

  return (
    <div className="h-[600px] flex justify-center items-center ">
      <div className="w-96 p-4">
        <h2 className="text-3xl text-center">Please Register</h2>

        <form onSubmit={handleSubmit(handleSignUp)}>
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
              <span className="label-text text-md">Password</span>
            </label>
            <input
              {...register("password", {
                required: "Password is Required",
                minLength: {
                  value: 6,
                  message: "Password Must Be 6 Or More Characters",
                },
                pattern: {
                  value: /(?=.*?[0-9])/,
                  message: "Password At Least 1 Letter",
                },
              })}
              type="password"
              className="input input-bordered w-full "
            />
            {errors.password && (
              <p role="alert" className="text-red-600 my-2">
                {errors.password?.message}
              </p>
            )}
            {singUpError && (
              <p role="alert" className="text-red-600 my-2">
                {singUpError}
              </p>
            )}
          </div>
          <input
            type="submit"
            className="input input-bordered w-full bg-primary text-white my-4"
            value="Register"
          />
        </form>
        <p>
          Already Have An Account{" "}
          <Link to="/login" className="text-red-500">
            Please Login
          </Link>
        </p>
        <div className="divider">OR</div>
        <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
          Continue With Google
        </button>
      </div>
    </div>
  );
};

export default SignUp;
