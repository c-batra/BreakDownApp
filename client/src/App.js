import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateGroup from "./CreateGroup";
import Profile from "./Profile";
import LogInPage from "./LogInPage";
import Homepage from "./Homepage";
import GroupExpenses from "./GroupExpenses";
import Register from "./Register";
import { Provider } from "react-redux";
import "./App.css";
import store from "./store";
import styled from "styled-components";
const App = () => {
  // fetch("localhost:8000/api/inventory");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "#36454F",
        backgroundImage: "linear-gradient(#DCE0DF, #333366)",
        minHeight: "550px",
      }}
    >
      <span
        style={{
          textShadow: "2px 2px #6D7B8D",
          fontWeight: 800,
          fontSize: "28px",
        }}
      >
        Splitter
      </span>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LogInPage />}></Route>
          {/* <Route exact path="/register" element={<Register />}</Route> */}
          <Route exact path="/home" element={<Homepage />}></Route>
          <Route exact path="/create-group" element={<CreateGroup />}></Route>
          <Route
            exact
            path="/group-expenses"
            element={<GroupExpenses />}
          ></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
const Spli = styled.span`
  color: orange;
`;

const Tter = styled.span`
  color: seagreen;
`;
export default App;
