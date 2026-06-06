import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Login() {
  let { register, handleSubmit, reset } = useForm();

  let navigate = useNavigate(); 

  let loginLogics = (loginData) => {
    const registeredUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check the login data present in registered users or not 
    const validUser = registeredUsers.find(user =>
        user.email === loginData.email &&
        user.password === loginData.password
    );

    if(validUser)
    {
        // alert('Login Sucessfull')
        navigate("/veg");
    }
    else{
        alert("login Faillllll Please wake up check code")
    }



  };
  return (
    <>
      <form onSubmit={handleSubmit(loginLogics)}>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />

        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
