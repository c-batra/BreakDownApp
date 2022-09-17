import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    fetch("/api/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((json) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <label>First Name</label>
      <input
        type="text"
        name="first_name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Enter email"
      ></input>
      <label>Last Name</label>
      <input
        type="text"
        name="last_name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Enter email"
      ></input>
      <label>Email address</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      ></input>
      <label>Password</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      ></input>
      <button type="submit" onClick={() => handleSubmit()}>
        Register
      </button>
    </div>
  );
};

export default Register;
