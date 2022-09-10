import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const Homepage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const onCreateGroup = () => {
    navigate("/create-group", {
      state: {
        email: location.state.email,
      },
    });
  };
  const onProfile = () => {
    navigate("/profile");
  };
  useEffect(() => {
    // API CALL TO GET ALL USER GROUPS AND EXPENSES
  });
  return (
    <Main>
      <div
        style={{
          border: "ridge",
          width: "500px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <CreateButton onClick={() => onCreateGroup()}>
          Create Group
        </CreateButton>
        <ProfileButton onClick={() => onProfile()}>Profile</ProfileButton>
      </div>
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const CreateButton = styled.button`
  padding: 10px;
  background-color: seagreen;
  align-items: center;
  width: 150px;
  margin: 10px;
`;

const ProfileButton = styled.button`
  background-color: orange;
  padding: 10px;
  width: 150px;
  align-items: center;
  margin: 10px;
`;

export default Homepage;
