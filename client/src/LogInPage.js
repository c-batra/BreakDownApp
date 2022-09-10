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

  const signedIn = () => {
    //TODO Password to be added as an extra condition
    const allEmails = allUsers.map((element) => element.email);
    if (allEmails.includes(email)) {
      navigate("/home", {
        state: {
          email: email,
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
      <h3>Welcome to BreakDownApp - Break It Down.!</h3>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => changeEmail(e)}
        value={email}
      ></input>
      <br />
      <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        value={password}
        onChange={(e) => changePassword(e)}
        required
      />
      <br />

      <Button onClick={() => signedIn()}> Log In</Button>
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
  width: 350px;
  background-color: seagreen;
`;
