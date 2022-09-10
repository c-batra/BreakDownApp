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
    label: element.first_name + " " + element.last_name,
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

  const membersSelect = () => {
    console.log("We selected");
  };

  const membersRemove = () => {
    console.log("We removed");
  };

  const changeGroupName = (e) => {
    setGroupName(e.target.value);
  };

  const onCreateGroup = () => {
    debugger;
    const body = {
      name: groupName,
      users: groupMembers,
    };
    fetch("/api/add-group", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((json) => {
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  const handleSelect = (data) => {
    //TODO To make it work when more users are selected
    const datakeys = data.map((element) => element.key);
    const loggedInUser = allUsers.filter(
      (element) => element.email == location.state.email
    )?.[0];
    if (groupMembers.includes(loggedInUser._id)) {
      setGroupMembers([...groupMembers, datakeys[0]]);
    } else {
      setGroupMembers([...groupMembers, loggedInUser._id, datakeys[0]]);
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
        <Select
          options={options}
          placeholder="Members"
          value={groupMembers}
          onChange={handleSelect}
          isSearchable={true}
          isMulti
        />
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
  background-color: seagreen;
  margin: 20px;
`;

const MembersDiv = styled.div`
  width: 350px;
  margin: 20px;
`;
export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);
