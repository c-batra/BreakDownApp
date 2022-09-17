import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { addGroup } from "./actions/actions";
import Select from "react-select";
import styled from "styled-components";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const location = useLocation();
  const options = allUsers.map((element) => ({
    key: element._id,
    value: element.first_name + " " + element.last_name,
  }));

  useEffect(() => {
    fetch("/api/get-users/")
      .then((res) => res.json())
      .then((json) => {
        console.log(json.data);
        setAllUsers(json.data);
      });
  }, []);

  const navigate = useNavigate();

  const changeGroupName = (e) => {
    setGroupName(e.target.value);
  };

  const onCreateGroup = () => {
    const body = {
      name: groupName,
      users: groupMembers,
      created_at: new Date(),
    };
    fetch("/api/add-group", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((json) => {
        navigate("/home", {
          state: {
            email: location.state.email,
            userId: location.state.userId,
            userName: location.state.userName,
          },
        });
      })
      .catch((err) => console.log(err));
  };

  const handleSelect = (e) => {
    //TODO To make it work when more users are selected
    const groupUser = e.target.value;
    const loggedInUser = allUsers.filter(
      (element) => element.email == location.state.email
    )?.[0];
    if (groupMembers.includes(loggedInUser._id)) {
      setGroupMembers([...groupMembers, groupUser]);
    } else {
      setGroupMembers([...groupMembers, loggedInUser._id, groupUser]);
    }
  };
  return (
    <Main>
      <div style={{ width: "350px" }}>
        Group Name:
        <br />
        <input
          style={{ width: "350px" }}
          type="text"
          value={groupName}
          onChange={(e) => changeGroupName(e)}
        />
      </div>
      <MembersDiv>
        Add Members:
        <select onChange={(e) => handleSelect(e)}>
          <option> Select Participant</option>
          {options.map((element) => (
            <option value={element.key}>{element.value}</option>
          ))}
        </select>
      </MembersDiv>
      <Button onClick={() => onCreateGroup()}>Create Group</Button>
    </Main>
  );
};
const mapStateToProps = (state) => ({
  appstate: state,
});
const mapDispatchToProps = (dispatch) => ({
  addGroup: (groupName) => dispatch(addGroup(groupName)),
});

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 50px;
`;

const Button = styled.button`
  width: 350px;
  background-color: #306eff;
  margin: 20px;
  border-radius: 10px;
  color: white;
  font-weight: 800;
  cursor: pointer;
  font-size: 14px;
`;

const MembersDiv = styled.div`
  width: 350px;
  margin: 20px;
`;
export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);
