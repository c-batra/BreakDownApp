import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const LogInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    fetch("/api/get-users/")
      .then((res) => res.json())
      .then((json) => {
        console.log(json.data);
        setAllUsers(json.data);
      });
  }, []);
  const toRegister = () => {
    navigate("/register");
  };
  const signedIn = () => {
    const loggedInUser = allUsers.filter(
      (element) => element.email == email && element.password == password
    );
    if (loggedInUser.length) {
      navigate("/home", {
        state: {
          email: email,
          userId: loggedInUser[0]._id,
          userName: loggedInUser[0].first_name,
        },
      });
    } else {
      alert("Wrong credentials");
    }
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  return (
    <Main>
      <Heading>Welcome to Splitter. Let's split it.!</Heading>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => changeEmail(e)}
        value={email}
        style={{ height: 25 }}
      ></input>
      <br />
      <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="Password"
        value={password}
        style={{ height: 25 }}
        onChange={(e) => changePassword(e)}
        required
      />
      <br />

      <Button onClick={() => signedIn()}> Log In</Button>
      <Button onClick={() => toRegister()}> Register</Button>
    </Main>
  );
};

export default LogInPage;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  padding: 10px;
  width: 250px;
  box-shadow: 3px 5px #000000;
  background-color: blue;
  color: white;
  font-weight: 800;
  border-radius: 10;
  cursor: pointer;
`;

const Heading = styled.span`
  font-size: 30px;
  margin: 15px;
  font-weight: bolder;
  color: blue;
  font-family: "Brush Script MT", cursive;
`;
