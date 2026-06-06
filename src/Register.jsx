import React from "react";
import { useForm } from "react-hook-form";

function Register() {
  const { register, handleSubmit, reset } = useForm();

  let submitLogics = (data) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(data);

    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful!");
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitLogics)}>
        <input
          type="text"
          placeholder="Full Name"
          {...register("name", { required: true })}
        />
        <br></br>

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <br></br>
        <input
          type="email"
          placeholder="Email Address"
          {...register("email", { required: true })}
        />
        <br></br>
        <input
          type="number"
          placeholder="Phone Number"
          {...register("phone", { required: true })}
        />
        <br></br>
        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default Register;
