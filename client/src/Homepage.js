import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const Homepage = () => {
  const [userGroups, setUserGroups] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const onCreateGroup = () => {
    navigate("/create-group", {
      state: {
        email: location.state.email,
        userId: location.state.userId,
        userName: location.state.userName,
      },
    });
  };
  const toGroupExpenses = (groupCode, groupName) => {
    navigate("/group-expenses", {
      state: {
        code: groupCode,
        name: groupName,
        email: location.state.email,
        userId: location.state.userId,
        userName: location.state.userName,
      },
    });
  };
  const onProfile = () => {
    navigate("/profile", {
      state: { userId: location.state.userId },
    });
  };

  const onLogInPage = () => {
    navigate("/");
  };

  useEffect(() => {
    // API CALL TO GET ALL USER GROUPS AND EXPENSES
    fetch("/api/get-groups/")
      .then((res) => res.json())
      .then((json) => {
        setUserGroups(json.data);
      })
      .catch((err) => console.log(err));
    fetch("/api/get-users/")
      .then((res) => res.json())
      .then((json) => {
        setAllUsers(json.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <button
        style={{ position: "absolute", right: "15px", top: "15px" }}
        onClick={() => onLogInPage()}
      >
        {" "}
        Logout{" "}
      </button>
      <Main>
        <div
          style={{
            border: "ridge",
            boxShadow: "5px 10px #888888",
            width: "500px",
            display: "flex",
            justifyContent: "space-around",
            borderRadius: "3px",
          }}
        >
          <CreateButton onClick={() => onCreateGroup()}>
            Create Group
          </CreateButton>
          <ProfileButton onClick={() => onProfile()}>Profile</ProfileButton>
        </div>
        <div style={{ marginTop: "50px", border: "ridge", width: "500px" }}>
          <table>
            <tr style={{ backgroundColor: "#B6B6B4" }}>
              <th style={{ border: "ridge", width: "250px" }}> Group </th>
              <th style={{ border: "ridge", width: "250px" }}> Members </th>
            </tr>
            {userGroups.map((element) =>
              element.users.includes(location.state.userId) ? (
                <tr
                  onClick={() => toGroupExpenses(element.code, element.name)}
                  style={{
                    backgroundColor: "#D1D0CE",
                    cursor: "pointer",
                    marginTop: 5,
                  }}
                >
                  {" "}
                  <td
                    style={{
                      textAlign: "center",
                      color: "#424647",
                      fontWeight: 600,
                    }}
                  >
                    {element.name}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      color: "#424647",
                      fontWeight: 600,
                    }}
                  >
                    {allUsers
                      .filter((user) => element.users.includes(user._id))
                      .map(
                        (user, index) =>
                          user.first_name +
                          " " +
                          user.last_name +
                          (index == 0 ? " AND " : "")
                      )}
                  </td>
                </tr>
              ) : null
            )}
          </table>
        </div>
      </Main>
    </div>
  );
};

const Main = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
  flex-direction: column;
  align-items: center;
`;

const GroupDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 20px;
`;

const LoggedInUser = styled.span`
  font-size: 20px;
  margin-bottom: 5px;
  align-items: center;
  display: flex;
  justify-content: center;
  font-family: cursive;
`;

const GroupButton = styled.button`
  margin: 10px;
  padding: 10px;
  width: 350px;
  display: flex;
  justify-content: space-evenly;
  background-color: navy;
  color: white;
`;

const CreateButton = styled.button`
  padding: 5x;
  background-color: #306eff;
  align-items: center;
  width: 150px;
  margin: 10px;
  border-radius: 10px;
  color: white;
  font-weight: 800;
  cursor: pointer;
  font-size: 14px;
`;

const ProfileButton = styled.button`
  background-color: #306eff;
  padding: 5px;
  width: 150px;
  align-items: center;
  margin: 10px;
  border-radius: 10px;
  color: white;
  font-weight: 800;
  cursor: pointer;
  font-size: 14px;
`;

export default Homepage;
